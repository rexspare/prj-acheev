import { first } from "lodash";
import React from "react";
import { AppText } from "../../shared/components/AppText";
import { Colors } from "../../shared/Constants";
import { NotificationFieldsFragment, SocialPostFieldsFragment, SocialPostType } from "../../types/gqlReactTypings.generated.d";

interface PostData {
  imageUrl?: string, body?: React.ReactNode
}

const calculateBaseData = (socialPost: SocialPostFieldsFragment): PostData => {
  switch (socialPost.type) {
    case SocialPostType.AddCollection:
      return {
        body: <AppText>{socialPost.user.firstName} added {socialPost.product?.name} to their collection</AppText>
      }
    case SocialPostType.AddWishlist:
      return {
        body: <AppText>{socialPost.user.firstName} added {socialPost.product?.name} to their wishlist</AppText>
      }
    case SocialPostType.ProductReview:
      return {
        body: (
          <AppText>{socialPost.user.firstName} rated {socialPost.product?.name} {socialPost.productReview?.rating}/<AppText style={{ color: Colors.ORANGE }}>{socialPost.productReview?.scale}</AppText></AppText>
        )
      }
  }
}

export const getPostData = (socialPost: SocialPostFieldsFragment): PostData | null => {
  const data = calculateBaseData(socialPost);
  if (data == null) {
    return null;
  }

  return {
    imageUrl: data.imageUrl ?? data.imageUrl ?? first(socialPost.product?.photoUrls),
    body: data.body
  }
}

const calculateBaseNotificatioDnata = (item: NotificationFieldsFragment): PostData => {
  switch (item.type) {
    default:
      return { body: item.body }
  }
}

export const getNotificationData = (notification: NotificationFieldsFragment): PostData | null => {
  const data = calculateBaseNotificatioDnata(notification);
  if (data == null) {
    return null;
  }

  return {
    imageUrl: data.imageUrl ?? data.imageUrl ?? first(notification.product?.photoUrls),
    body: data.body
  }
}