
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from '../../store/cart/cart.selector';

import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles";
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';


type ProductCardProps = {
    product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({product}) => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch()

    const {name, price, imageUrl} = product

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    );
}
export default ProductCard;