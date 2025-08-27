import {useState, useEffect} from "react"

export default function BodyText() {
    interface Product{
        id: number,
        title: string,
        description: string,
        cost: number
    }
    interface Cart{
        id: number,
        quantity: number,
        cost:number
    }
    //Typescript syntax, used to assign static typing to dictionaries, in this case, json data

    const [products, displayProducts] = useState<Product[]>([])
    const [cart, displayCart] = useState<Cart[]>([])
    // useState(specify type) () to prevent any static typing errors

    async function LoadCart(){
        const res = await fetch("http://localhost:4242/cart")
        displayCart(await res.json())
        //notice use of await statements in async function
    }
    //simple code to load the items from the database to the page

    async function addToCart(id:number, quantity:number, cost:number) {
        await fetch("http://localhost:4242/cart", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, quantity, cost})
        })
        //POST request to express server, be careful of body json data
        // Inputs should always come from function, DON'T hardcode data
        
        // alert("You have added an item from the cart")
        LoadCart()
    }

    async function removeFromCart(id: number, removeAll = false) {
        await fetch("http://localhost:4242/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, removeAll }),
        });
        // alert("You have removed item(s) from the cart")
        LoadCart();
    }

    function LoadProducts(){
        return products.map((product) => (
            <>
                <ul key={product.id}>{product.id}, {product.title}, {product.description}, {product.cost}</ul>
                <button onClick={() => addToCart(product.id, 1, product.cost)}>Add to Cart</button>
                <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                <button onClick={() => removeFromCart(product.id, true)}>Remove All from Cart</button>
            </>
        ))
        //Load elements onto page via mapping + return syntax
    }

    useEffect(() => {
    async function loadData(){
        const res = await fetch("http://localhost:4242")
        // domain to be changed if and when hosted
        displayProducts(await res.json())
    }
    loadData()
    }, [])
    // useEffect in conjunction with async to load items onto page ONCE
    // use of empty array at the back to signify no arguments and prevent 
    // component from rendering after every update

    function ShowCart(){
        return cart.map((items) => (
            <li>{items.id}, {items.quantity}, {items.cost}</li>
        ))
        // Again, simple map + return syntax to render
        //!!!VERY IMPORTANT --> include key to prevent re-renders for react
    }


    return (
        <>
        <ul className="text">
            <LoadProducts />
        </ul>
        <ul>
            <ShowCart />
        </ul>
        </>
    )
}