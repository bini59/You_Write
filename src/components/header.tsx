import * as React from "react";
import Head from "next/head";


const Header = () => {
    return (
        <Head>
            <title>Youtube Writing App</title>
            <link rel="icon" href="/favicon.ico" />
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" async />
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" async />
        </Head>
    )
}

export default Header;