import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  createNewUser,
  getUsersForCompany,
  removeUser,
  updateUserData,
} from "api";
import { EUserType, IUserEditForm, usersModel } from "../../entities/users";
import { pagesModel } from "../../entities/pages";
import {
  ButtonStyled,
  MyForm,
  NewModal,
  NewModalBody,
  NewModalCloseButton,
  NewModalContainer,
  NewModalHeader,
  TitleH1,
} from "../../app/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { CUsersTypeNames } from "../../entities/users/users.consts";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@mui/material/colors";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    newPassword: yup
      .string()
      .test("newPasswordCheck", "Four characters, only numbers", (password) =>
        !!password?.length ? !!password.match(/^(\d){4,4}$/g) : true
      ),
    type: yup.string().required(),
  })
  .required();

export const UsersFormModal: React.FC = () => {
  const { form, usersForCompany, isLoading } = useAppSelector((s) => s.users);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IUserEditForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: form?.formData?.name || "",
      newPassword: "",
      type: form.formData?.type || EUserType.PERSONAL,
    },
  });

  useEffect(() => {
    if (!!form.formData?.id) {
      setValue("name", form.formData?.name);
      setValue("type", form.formData?.type);
    }
  }, [form.formData]);

  const handleUpdateAfterChanging = () => {
    dispatch(usersModel.actions.clearFormData());
    dispatch(getUsersForCompany());
  };

  const onSubmit: SubmitHandler<IUserEditForm> = ({
    newPassword,
    type,
    name,
  }) => {
    if (!form.formData?.id && !newPassword?.length) {
      setError("newPassword", { message: "Password is required" });
    }
    (form.formData?.id
      ? dispatch(
          updateUserData({
            newPassword,
            type,
            name,
            userId: form.formData.id,
          })
        )
      : dispatch(
          createNewUser({
            newPassword,
            type,
            name,
          })
        )
    ).then(({ payload }) => {
      if (!!payload?.isSuccess) {
        handleUpdateAfterChanging();
      }
    });
  };

  React.useEffect(() => {
    const userFromFormData = usersForCompany.find(
      (u) => u.id === form.formData?.id
    );
    if (userFromFormData) {
      dispatch(usersModel.actions.setFormData(userFromFormData));
    }
  }, [usersForCompany]);

  const handleRemoveClick = () => {
    dispatch(usersModel.actions.setIsOpenRemove(true));
  };

  const handleRemoveUser = () => {
    if (form.formData?.id) {
      dispatch(removeUser(form.formData.id)).then(() =>
        handleUpdateAfterChanging()
      );
    }
  };

  const handleCloseModal = () => {
    dispatch(usersModel.actions.toggleIsOpenModal());
  };

  return (
    <NewModal open={form.isOpen}>
      <NewModalContainer>
        <NewModalHeader>
          <TitleH1 size={22}>
            {form.formData?.id ? "User edition" : "New user"}
          </TitleH1>
        </NewModalHeader>
        <NewModalCloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </NewModalCloseButton>
        <NewModalBody>
          {" "}
          <MyForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  error={!!errors["name"]?.message}
                  helperText={
                    errors["name"]
                      ? errors["name"]?.message?.toString()
                      : "Fill users title for system"
                  }
                  variant="filled"
                  style={{ marginBottom: 8 }}
                  {...field}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth style={{ marginBottom: 8 }}>
                  <InputLabel variant="filled" htmlFor="selectType">
                    User type
                  </InputLabel>
                  <Select
                    error={!!errors["type"]?.message}
                    variant="filled"
                    inputProps={{
                      name: "type",
                      id: "selectType",
                    }}
                    {...field}
                  >
                    <MenuItem value={EUserType.ADMIN}>
                      {CUsersTypeNames[EUserType.ADMIN]}
                    </MenuItem>
                    <MenuItem value={EUserType.PERSONAL}>
                      {CUsersTypeNames[EUserType.PERSONAL]}
                    </MenuItem>
                    <MenuItem value={EUserType.KITCHEN}>
                      {CUsersTypeNames[EUserType.KITCHEN]}
                    </MenuItem>
                    <MenuItem value={EUserType.MANAGER}>
                      {CUsersTypeNames[EUserType.MANAGER]}
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    Select user type for permissions
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  style={{ marginBottom: 8 }}
                  label="New password"
                  error={!!errors["newPassword"]?.message}
                  helperText={
                    errors["newPassword"]
                      ? errors["newPassword"]?.message?.toString()
                      : "If you want to change password - fill this field"
                  }
                  variant="filled"
                  type="password"
                  {...field}
                />
              )}
            />
            <ButtonStyled
              top={15}
              disabled={
                watch("name") === form.formData?.name &&
                watch("type") === form.formData?.type &&
                watch("newPassword") === ""
              }
            >
              {form.formData?.id ? "Save users" : "Add users"}
            </ButtonStyled>
            {form.formData?.id && (
              <ButtonStyled
                top={15}
                background={red[800]}
                onClick={handleRemoveClick}
              >
                Remove user
              </ButtonStyled>
            )}
          </MyForm>
        </NewModalBody>
      </NewModalContainer>
    </NewModal>
  );
};
