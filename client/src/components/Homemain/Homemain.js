import React from 'react'
import "./Homemain.scss"

const Homemain = () => {
    return (
        <>
            <section id='home'>
                <div className="home_page">
                    <div className="home_img">
                        <img src="/banner.png" alt="" />
                    </div>
                    <div className="home_txt">
                        <p>SUMMER COLLECTION</p>
                        <h2>FALL - WINTER <br /> Collection 2023</h2>
                        <div className="home_label">
                            <p>A specialist label creating luxury essentials. Ethically crafted <br />
                                with an unwavering commitment to exceptional quality.</p>
                        </div>
                        <button>
                            <a href="">SHOP NOW</a>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Homemain