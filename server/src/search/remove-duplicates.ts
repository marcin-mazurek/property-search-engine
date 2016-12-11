import { uniqBy } from 'lodash';
import Property from '../../../core/src/property';

export default function removeDuplicates(properties: Property[]): Property[] {
  return uniqBy(properties, property => property.offerUrl);
}