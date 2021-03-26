import React from "react";

function PageWrapper({ children }) {
	return (
		<div className="container">
			<main className="main">{children}</main>
		</div>
	);
}

export default PageWrapper;