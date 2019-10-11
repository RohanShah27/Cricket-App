// import React, { Component } from "react";
// import { connect } from "react-redux";
// import "../styles/Venues.css";
// import IndiaFlag from "../assests/india.jpg";
// import PakistanFlag from "../assests/pakistan.jpg";
// import SouthAfricaFlag from "../assests/southafrica.jpg";
// import SriLankaFlag from "../assests/srilanka.jpg";
// import AustraliaFlag from "../assests/australia.jpg";
// import BangladeshFlag from "../assests/bangladesh.png";
// import WestIndiesFlag from "../assests/westindies.png";
// import ZimbabweFlag from "../assests/zimbabwe.png";
// import NewZealandFlag from "../assests/newzealand.jpg";
// import EnglandFlag from "../assests/england.png";
// import Carousel from "react-multi-carousel";
// import CaptainRoop from "../assests/Captain Roop Singh.jpg";
// import Brabourne from "../assests/Brabourne Stadium.jpg";
// import Reliance from "../assests/Reliance stadium.jpg";
// import Nehru from "../assests/Nehru Stadium.jpg";
// import GreenPark from "../assests/green park.jpg";
// import "react-multi-carousel/lib/styles.css";
// import ReactCountryFlag from "react-country-flag";

// import { getVenuesByCountry } from "../actions/Venues";

// export class Venues extends Component {
//   responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 8
//     }
//   };

//   state = {
//     country: ""
//   };

//   componentDidMount() {
//     this.props.getVenuesByCountry();
//   }

//   handleChange = name => {
//     console.log(name);
//     this.setState({ country: name });
//     let countryName = {
//       country: this.state.country
//     };
//     this.props.getVenuesByCountry(countryName);
//   };

//   render() {
//     // console.log(this.props.venues);
//     return (
//       <div>
//         <div>
//           <section className="venueSection">
//             <h1 className="venueHeading">Cricket Venues</h1>

//             <Carousel responsive={this.responsive}>
//               <ReactCountryFlag
//                 styleProps={{
//                   width: "80px",
//                   height: "80px"
//                 }}
//                 code="in"
//                 svg
//               />
//               {/* <div>
//                 <a
//                   value="India"
//                   onClick={() => {
//                     this.handleChange("India");
//                   }}
//                 >
//                   <img className="image" src={IndiaFlag} alt="Indian Flag " />
//                 </a>
//               </div>
//               <div>
//                 <img className="image" src={EnglandFlag} alt="Pakistan Flag " />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={WestIndiesFlag}
//                   alt="WestIndies Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={AustraliaFlag}
//                   alt="Australia Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={PakistanFlag}
//                   alt="Pakistan Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={BangladeshFlag}
//                   alt="Bangladesh Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={SriLankaFlag}
//                   alt="Sri Lanka Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={NewZealandFlag}
//                   alt="New Zealand Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={ZimbabweFlag}
//                   alt="Zimbabwe Flag "
//                 />
//               </div>
//               <div>
//                 <img
//                   className="image"
//                   src={SouthAfricaFlag}
//                   alt="South Africa Flag "
//                 />
//               </div> */}
//             </Carousel>
//           </section>
//         </div>
//         {/* <div>
//           <img className="image" src={IndiaFlag} alt="Indian Flag " />
//           <p className="countryHeading">Indian Venues</p>
//         </div> */}
//         <div class="grid-container">
//           <div class="groundCard">
//             <img className="groundImages" src={CaptainRoop} alt="Stadium " />
//             <div class="middle">
//               <div class="text">Gwalior</div>
//             </div>
//             <div class="container">
//               <h2 class="groundName">
//                 <b>Captain Roop Stadium</b>
//               </h2>
//             </div>
//           </div>
//           <div class="groundCard">
//             <img className="groundImages" src={Brabourne} alt="Stadium " />
//             <div class="container">
//               <h2 class="groundName">
//                 <b>Brabourne Stadium</b>
//               </h2>
//             </div>
//           </div>
//           <div class="groundCard">
//             <img className="groundImages" src={Reliance} alt="Stadium " />
//             <div class="container">
//               <h2 class="groundName">
//                 <b>Reliance Stadium</b>
//               </h2>
//             </div>
//           </div>
//           <div class="groundCard">
//             <img className="groundImages" src={GreenPark} alt="Stadium " />
//             <div class="container">
//               <h2 class="groundName">
//                 <b>Green Park Stadium</b>
//               </h2>
//             </div>
//           </div>
//           <div class="groundCard">
//             <img className="groundImages" src={Nehru} alt="Stadium " />
//             <div class="container">
//               <h2 class="groundName">
//                 <b>Nehru Stadium</b>
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   venueByCountry: state.venuesReducer.venueByCountry
// });

// export default connect(
//   mapStateToProps,
//   { getVenuesByCountry }
// )(Venues);
