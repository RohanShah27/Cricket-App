import React, { Component } from "react";
import "../styles/footer.css";
export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p className="footer-p"> © Powered By Headstrait</p>
        <div className="footer-follow">
          <i class="fab fa-twitter footer-fab"></i>
          <i class="fab fa-facebook footer-fab"></i>
          <i class="fab fa-instagram footer-fab"></i>
          <i class="fab fa-pinterest footer-fab"></i>
        </div>
      </div>
    );
  }
}
