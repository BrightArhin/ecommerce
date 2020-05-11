import {createSelector} from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
   [selectShop] ,
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => collections ? Object.keys(collections).map(key=> collections[key]) : []
)

export const selectIsFetchingCollections = createSelector(
    [selectShop],
    (shop) => shop.isFetching
)


export const selectCollectionById = (collectionUrlParam) => {
  return  createSelector(
        [selectShopCollections],
        (collections) => collections ? collections[collectionUrlParam] : null
    )
}

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)

