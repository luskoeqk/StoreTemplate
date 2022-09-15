
import { useState } from 'react';
import { useQuery } from 'react-query';

import Item from './components/item/Item'

import Drawer from '@material-ui/core/Drawer';
import inearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import { Wrapper, StyledButton } from './App.styles'
import LinearProgress from '@material-ui/core/LinearProgress';


export type CartItemType = {
	id: number;
	catergory: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
}


const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch('https://fakestoreapi.com/products')).json();
}

const App = () => {

	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
	console.log(data)

	const getTotalItems = () => null;

	const handleAddToCart = () => null;

	const hangleRemoveFromCart = () => null;


	if (isLoading) {
		return (
			<LinearProgress />
		)
	}


	if (error) {
		return (
			<div><h2>Error, something went wrong... :(</h2></div>
		)
	}



	return (
		<Wrapper>
			<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
				Cart goes here
			</Drawer>
			
			<StyledButton onClick={() => setCartOpen(true)}>
				Cart
			</StyledButton>

			<Grid container spacing={3}>
				{data?.map(item => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}


			</Grid>
		</Wrapper>
	);
}

export default App;
