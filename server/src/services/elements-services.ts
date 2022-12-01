import { IElement } from "../interfaces/elements";
import elementsRepository from "../repositories/elements-repository";

const search = async (): Promise<IElement[]> => {
  const elements = await elementsRepository.findAll();
  return elements;
};

const create = async (element: IElement): Promise<IElement> => {
  const createdElement = await elementsRepository.create(element);
  return createdElement;
};

const update = async (element: IElement): Promise<IElement> => {
  const updatedElement = await elementsRepository.updateById(element, element.id || 0);
  return updatedElement;
};

const remove = async (element: IElement): Promise<{}> => {
  element.id && (await elementsRepository.removeById(element.id));
  return {};
};

export default { search, create, update, remove };
