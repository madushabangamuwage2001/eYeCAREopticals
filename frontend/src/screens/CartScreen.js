import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import "../styles/cart.css";
import Rating from 'react-rating-stars-component';
import Loader from '../components/Loader';

const CartScreen = () => {

    const [cart, setCart] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function ViewCartDetails() {
            try {

                setTimeout(async () => {
                    setLoading(true);
                    const response = await axios.post(`http://localhost:5000/api/cart/getallcartitems/${user.email}`);
                    setCart(response.data.cart);
                    console.log(response.data.cart);
                    setLoading(false);
                }, 700);
            } catch (error) {
                console.log(error);
            }
        }
        ViewCartDetails();
    }, [user.email]);


    async function removeCart(id) {

        try {


            const data = (await axios.delete(`http://localhost:5000/api/cart/removecartitem/${id}`)).data;
            console.log(data);
            Swal.fire('Removed', "Your cart item is removed", 'success').then(result => {

                window.location.reload();

            });

        } catch (error) {

            console.log(error);
            Swal.fire('Error', "Error with removing cart item", 'error');


        }
    }

    return (
        <div>

            {loading ? (
                <Loader />
            ) : (

                <section className="my-5">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-9">
                                <div className="card border shadow-0 mt-5">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4 myshoppingcart"><strong>My shopping cart</strong></h4><br />

                                        <div className="row mb-5 cartlisttable">
                                            {cart.map((cart) => (
                                                <div className="col-lg-3 cartlisttablecol1">
                                                    <div className="caritemscard" data-aos="zoom-in">
                                                        <div className="row" >
                                                            <div className="col md-3">
                                                                <p className="cartitemscardptag1">
                                                                    <span style={{ color: "#0a5a70" }}><strong>{cart.brand} | {cart.model}</strong></span><br />
                                                                    <span style={{ fontSize: "11px" }}>{cart.type} | {cart.gender}</span>
                                                                    <Rating
                                                                        count={5}
                                                                        value={cart.rating}
                                                                        size={24}
                                                                        edit={false}
                                                                    />
                                                                    <br />
                                                                    <Link to={`/${cart.brand}/${cart.model}`}><button className="btn cartviewbtn">View</button></Link>
                                                                    <button className="btn cartremovebtn" onClick={(e) => removeCart(cart._id)} >Remove</button>
                                                                </p>
                                                            </div>
                                                            <div className="col md-3" >
                                                                <p className="cartitemscardptag1">
                                                                    <img src={cart.imageurlcolor[0]} alt="" width={100} /><br />
                                                                    <span><strong>LKR</strong></span> <span style={{ color: "#ab2317" }}><strong>{cart.price}</strong></span>
                                                                </p>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0 mt-5">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label className="form-label">Have coupon?</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control border" name="" placeholder="Coupon code" />
                                                    <button className="btn btn-light border">Apply</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2">$329.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Discount:</p>
                                            <p className="mb-2 text-success">-$60.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">TAX:</p>
                                            <p className="mb-2">$14.00</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2 fw-bold">$283.00</p>
                                        </div>

                                        <div className="mt-3">
                                            <a href="#" className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
                                            <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            )}



        </div>
    );
}

export default CartScreen;