import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/RayBan.css';
import CheEyeGlass from '../images/cheglass.gif';
import Rating from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ duration: 1000 });

const Che = () => {
    const { brand } = useParams();

    const [che, setChe] = useState([]);
    const [duplicateChe, setDuplicateChe] = useState([]);

    const [searchkey, setSearchkey] = useState('');
    const [type, setType] = useState('all');
    const [gender, setGender] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');

    const [hasResults, setHasResults] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getChe() {

            try {
                setTimeout(async () => {
                    setLoading(true);
                    const response = await axios.post(`http://localhost:5000/api/eyeglass/${brand}`);
                    setChe(response.data.eyeGlass);
                    setDuplicateChe(response.data.eyeGlass);
                    setLoading(false);
                }, 700);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getChe();
    }, [brand]);

    function filterBySearch() {
        const tempChe = duplicateChe.filter((che) => che.model.toLowerCase().includes(searchkey.toLowerCase()));
        setHasResults(tempChe.length > 0);
        setChe(tempChe);
    }

    function filterByType(e) {
        setType(e);
        const filteredChe = applyFilters(e, gender, selectedPriceRange);
        setHasResults(filteredChe.length > 0);
        setChe(filteredChe);
    }

    function filterByGender(e) {
        setGender(e);
        const filteredChe = applyFilters(type, e, selectedPriceRange);
        setHasResults(filteredChe.length > 0);
        setChe(filteredChe);
    }

    function filterByPrice(e) {
        setSelectedPriceRange(e);
        const filteredChe = applyFilters(type, gender, e);
        setHasResults(filteredChe.length > 0);
        setChe(filteredChe);
    }

    function applyFilters(selectedType, selectedGender, selectedPrice) {
        return duplicateChe.filter((che) => {
            const typeCondition = selectedType === 'all' || che.type.toLowerCase() === selectedType.toLowerCase();
            const genderCondition = selectedGender === 'all' || che.gender.toLowerCase() === selectedGender.toLowerCase();
            const priceCondition = selectedPrice === 'all' || (che.price <= parseInt(selectedPrice) && che.price >= parseInt(selectedPrice) - 9999);
            return typeCondition && genderCondition && priceCondition;
        });
    }

    return (

        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>

                    <br /><br /><br />

                    <div className='row'>
                        <div className='col md-3 RBtable_1col_1'>
                            <img src="https://cheeyewear.com.au/cdn/shop/files/Screen_Shot_2023-09-16_at_12.36.42_pm_1200x1200.png?v=1694845852" alt="" width="200" className="img-fluid mb-4 mb-lg-0" data-aos="zoom-in" /><br />
                            <div style={{textAlign:"justify",width:"450px",fontSize:"14px"}}><p data-aos="fade-right"><small>CHE eyeglasses and sunglasses redefine contemporary
                                 eyewear with innovative designs and premium craftsmanship.
                             Combining style and sustainability, each pair is meticulously
                              crafted using eco-friendly materials. With a focus on comfort and 
                            durability, CHE eyewear offers both fashion-forward aesthetics and
                             conscientious ethics, making a statement that's as eco-conscious as it is chic.</small></p></div>
                        </div>
                        <div className='col md-3'>
                            <img src={CheEyeGlass} alt="" className="img-fluid" />
                        </div>
                    </div>

                    <div className='container' style={{marginLeft:"190px"}}>

                        <div className='row mt-5 RBtable_3'>

                            <div className='col md-3 RBtable_3col_1'>
                                <small className='barname2'>Search here</small>
                                <input class="form-control mr-sm-2 RayBanSearch" type="search" placeholder="Search model No." aria-label="Search"
                                    onChange={(e) => {
                                        setSearchkey(e.target.value);
                                    }}
                                    onKeyUp={filterBySearch}
                                />
                            </div>

                            <div className='col md-3 RBtable_3col_1'>
                                <small className='barname'>Select Type</small>
                                <select className="RayBanTypeSelect" value={type} onChange={(e) => { filterByType(e.target.value) }}>
                                    <option value="all">All</option>
                                    <option value="prescription eyeglasses">Prescription Eyeglasses</option>
                                    <option value="sunglasses">Sunglasses</option>
                                </select>
                            </div>

                            <div className='col md-3 RBtable_3col_1'>
                                <small className='barname'>Select Gender</small>
                                <select className="RayBanTypeSelect" value={gender} onChange={(e) => { filterByGender(e.target.value) }}>
                                    <option value="all">All</option>
                                    <option value="unisex">Unisex</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>

                            <div className='col md-3 RBtable_3col_1'>
                                <small className='barname'>Select Price</small>
                                <select className="RayBanTypeSelect" value={selectedPriceRange} onChange={(e) => { filterByPrice(e.target.value) }}>
                                    <option value="all">All</option>
                                    <option value="9999">LKR 0 - LKR 9 999</option>
                                    <option value="19999">LKR 10 000 - LKR 19 999</option>
                                    <option value="29999">LKR 20 000 - LKR 29 999</option>
                                    <option value="39999">LKR 30 000 - LKR 39 999</option>
                                    <option value="49999">LKR 40 000 - LKR 49 999</option>
                                    <option value="59999">LKR 50 000 - LKR 59 999</option>
                                    <option value="69999">LKR 60 000 - LKR 69 999</option>
                                    <option value="79999">LKR 70 000 - LKR 79 999</option>
                                    <option value="89999">LKR 80 000 - LKR 89 999</option>
                                </select>
                            </div>

                        </div>
                    </div>

                    {hasResults ? (
                        <div className="row mb-5 mt-5 RBtable_2">
                            {che.map((eyeglass) => (
                                <div className="col-lg-3 RBtable_2col_1" key={eyeglass._id} data-aos="zoom-in">
                                    <img src={eyeglass.imageurlcolor1[0]} alt="" width={250} />
                                    <p>
                                        {eyeglass.brand} | <strong style={{ color: "#0a5a70" }}>{eyeglass.model}</strong><br />
                                        <small>{eyeglass.type}</small><br />
                                        <Rating
                                            count={5}
                                            value={eyeglass.rating}
                                            size={24}
                                            edit={false}
                                        />
                                        <hr style={{ backgroundColor: "black" }} />
                                        Frame : <strong>LKR {eyeglass.price}</strong>
                                        <Link to={`/Ray-Ban/${eyeglass.model}`}><button className='Reyeglassesbtn' >SHOP NOW !</button></Link>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <img src="https://cdn.dribbble.com/users/1982249/screenshots/13673321/media/245af641dcd3f72ec8301750900169b9.png?resize=400x300&vertical=center" alt="" />
                        </div>
                    )}

                </div>
            )}
        </div>

    );
}

export default Che;
