import { FC } from "react";

//style
import { Image, ItemDiv, ItemPriceNew, ItemPrices, NoImageAvailable, Paragraph } from "./style/Item.style";

interface ItemProps {
  id?: number;
  image?: string;
  name?: string;
  price?: any;
  old_item?: any;
  description?: string;
}

const Item: FC<ItemProps> = (props) => {
  return (
    <ItemDiv>
      {props.image ? (
        <Image
          src={`data:image/jpeg;base64,${props.image}`}
          alt={props.name || ""}
        />
      ) : (
        <NoImageAvailable>No Image Available</NoImageAvailable>
      )}
      <Paragraph>{props.description}</Paragraph>
      <ItemPrices>
        {props.price && <ItemPriceNew>{props.price} $</ItemPriceNew>}
      </ItemPrices>
    </ItemDiv>
  );
};

export default Item;
