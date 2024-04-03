import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer>
            <div
                style={{
                width: "100%",
                minHeight: "20vh",
                maxHeight: "30vh",
                marginTop: 60,
                }}
            >
                <p style={{ fontSize: "10px", textAlign: "center", padding: "5px" }}>
                    MARCH 2024
                </p>
            </div>
        </footer>
    )
}

export default Footer