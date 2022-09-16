import React from "react";
import { Link } from "react-router-dom";

function Cards(props) {
    return (
        <div class="card rounded-0">
            <div class="card-body text-center">
                {<Link to={`/productlanding/${props.id}`}><img class="card-img-top shop-item" alt="..." src={process.env.PUBLIC_URL + props.image} /></Link>}
                <h6>{props.name}</h6>
                <p><span style={{ color: 'red' }}>{props.price} </span>  <span style={{ textDecorationLine: 'line-through' }}> {props.oldPrice} </span> {props.off}</p>
            </div>
        </div>
    );
}

function ShopCards(props) {
    return (
        <div class="card rounded-0">
            <div class="card-body text-center">

            {<Link to={`/productlanding/${props.id}`}><img class="card-img-top shop-item rounded-0" alt="..." src={props.image} /></Link>}
                <h6>{props.name}</h6>
                <p><span style={{ color: 'red' }}>₹{props.price} </span> </p>
            </div>
        </div>
    );
}

function ChangeProduct(props) {
    return (
        <div class="card rounded-0">
            <div class="card-body text-start">

            {<Link to={`/productlanding/${props.id}`}><img class="card-img-top shop-item rounded-0" alt="..." src={props.image} /></Link>}
                <h6>{props.name}</h6>
                <p><span style={{ color: 'red',marginRight:"8rem" }}>₹{props.price} </span> 
                <Link to={`/productupdate/${props.id}`}><button class="btn btn-primary">Update</button></Link>
                <button onClick={props.clickDelete} type="button" style={{ border: "none", color: "white",marginLeft:"0.5rem" }}><i class="fa-solid fa-trash"></i></button>

                </p>
            </div>
        </div>
    );
}

export { Cards, ShopCards,ChangeProduct };