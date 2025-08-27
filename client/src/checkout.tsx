import {useState, useEffect} from "react"

export default function CheckOut(){
    interface Cart{
        id: number,
        quantity: number,
        cost: number
    }
    // const [products, displayProducts] = useState<Product[]>([])
    const [cart, displayCart] = useState<Cart[]>([])
    const [totalCost, updateTotalCost] = useState(0) 

    useEffect(() => {
    async function loadCartAndProducts(){
        const rescart = await fetch("http://localhost:4242/cart")
        // const resproducts = await fetch("http://localhost:4242")
        // domain to be changed if and when hosted
        displayCart(await rescart.json())
        // displayProducts(await resproducts.json())
    }
    loadCartAndProducts()
    }, [])

    useEffect(() => {
        let currentTotal = 0
        for (let i = 0; i < cart.length; i++){
            currentTotal += cart[i].cost * cart[i].quantity
        }
        updateTotalCost(currentTotal)
    },[cart])
    
    function ShowCart(){
        return cart.map((product) => (
            <>
                <ul key={product.id}> The product id is {product.id}, and your cost for this product is {product.cost} : {product.quantity}</ul>
            </>
        ))
        //Load elements onto page via mapping + return syntax
        //!!!VERY IMPORTANT --> include key to prevent re-renders for react
    }
    


    function TotalCost(){
        return (
            <ul>Your total cost is {totalCost} </ul>
        )
    }

    return(
        <>
            <ShowCart />
            <TotalCost />
        </>
    )
}