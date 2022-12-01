import { ICategory } from "../interfaces/categories";
import categoriesRepository from "../repositories/categories-repository";

const search = async (): Promise<ICategory[]> => {
  const categories = await categoriesRepository.findAll();
  return categories;
};

const create = async (category: ICategory): Promise<ICategory> => {
  const createdCategory = await categoriesRepository.create(category);
  return createdCategory;
};

const update = async (category: ICategory): Promise<ICategory> => {
  const updatedCategory = await categoriesRepository.updateById(category, category.id || 0);
  return updatedCategory;
};

const remove = async (category: ICategory): Promise<{}> => {
  category.id && (await categoriesRepository.removeById(category.id));
  return {};
};

export default { search, create, update, remove };
