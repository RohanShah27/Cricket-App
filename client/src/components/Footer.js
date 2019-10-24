import React, { Component } from "react";
import "../styles/footer.css";
export default class Footer extends Component {
  render() {
    return (
      // Start of Footer -Rohan
      <div className="footer">
        <p className="footer-p" id="footerInfo">
          {" "}
          © Powered By Headstrait
        </p>
        {/* Social media logos -Rohan */}
        <div className="footer-follow">
          <i className="fab fa-twitter footer-fab"></i>
          <i className="fab fa-facebook footer-fab"></i>
          <i className="fab fa-instagram footer-fab"></i>
          <i className="fab fa-pinterest footer-fab"></i>
        </div>
      </div>
      // End of footer-Rohan
    );
  }
}
