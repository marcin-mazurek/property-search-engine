import { uniqBy } from 'lodash';
import Property from '../../../core/src/property';

export default function removeDuplicates(properties: Property[]): Property[] {
  return removeDuplicatedUrls(
    removeDuplicatedTitlePriceCombination(properties)
  );
}

const removeDuplicatedUrls = (properties: Property[]) => uniqBy(properties, property => property.offerUrl);
const removeDuplicatedTitlePriceCombination = (properties: Property[]) => uniqBy(properties, property => property.title + property.price);