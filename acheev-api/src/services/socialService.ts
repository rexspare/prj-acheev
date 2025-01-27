// import { PartialModelObject } from "objection";
// import { SocialPostModel } from "../models/socialPostModel";
// import { CollectionItemType, SocialPostType } from "../types/gqlTypings.generated";


// export const addProductReviewSocialPost = async (props: Required<Pick<SocialPostModel, 'productReviewId' | 'productId' | 'userId'>>) => {
//   return addSocialPost({ ...props, type: SocialPostType.ProductReview })
// }

// export const addCollectionItemSocialPost = async (props: Required<Pick<SocialPostModel, 'productId' | 'userId'>>, collectionType: CollectionItemType) => {
//   if (collectionType !== CollectionItemType.Inventory && collectionType !== CollectionItemType.Wishlist) {
//     return Promise.resolve();
//   }

//   return addSocialPost({ ...props, type: collectionType === CollectionItemType.Inventory ? SocialPostType.AddCollection : SocialPostType.AddWishlist })
// }

// const addSocialPost = async (socialPostFields: PartialModelObject<SocialPostModel> & Required<Pick<SocialPostModel, 'userId' | 'type'>>) => {
//   try {
//     return SocialPostModel.query().insert(socialPostFields);
//   } catch (e) {
//     console.warn(e);
//     return Promise.resolve();
//   }
// }