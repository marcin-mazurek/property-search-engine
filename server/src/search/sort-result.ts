import { sortBy } from 'lodash';
import Property from '../../../core/src/property';

export default function sortResult(properties: Property[], fieldName: string, ascending: boolean = true): Property[] {
  const sortedProperties = sortBy(properties, fieldName);
  
  if (ascending) {
    return sortedProperties;
  } else {
    return sortedProperties.reverse();
  }
}