import React from "react";

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>link</h2>
            <p>you link: <a href={link.to} targe="_blank" rel="noopener noreferer">{link.to}</a></p>
            <p>from: <a href={link.from} targe="_blank" rel="noopener noreferer">{link.from}</a></p>
            <p>total clicks on link: <strong>{link.clicks}</strong></p>
            <p>created: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}
