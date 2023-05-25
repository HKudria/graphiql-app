import { TypeDescriptionInterface } from '../DocumentationInterfaces';

function getTypeName(type: TypeDescriptionInterface): string | null {
  if (type.ofType) return getTypeName(type.ofType);
  return type.name;
}

export default getTypeName;
