function openNeshanMap(latitude?: number | null, longitude?: number | null) {
	if (!latitude || !longitude) return;
	const userAgent =
		typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
	const isAndroid = /android/i.test(userAgent);
	const isIOS = /iphone|ipad|ipod/i.test(userAgent);

	if (isAndroid) {
		window.location.href = `intent://nshn.ir/?lat=${latitude}&lng=${longitude}#Intent;scheme=http;package=org.rajman.neshan.traffic.tehran.navigator;S.browser_fallback_url=https://nshn.ir/?lat=${latitude}&lng=${longitude};end`;
	} else if (isIOS) {
		window.location.href = `https://nshn.ir/?lat=${latitude}&lng=${longitude}`;
	} else {
		window.open(
			`https://nshn.ir/?lat=${latitude}&lng=${longitude}`,
			'_blank',
			'noopener,noreferrer',
		);
	}
}

function openGoogleMaps(latitude?: number | null, longitude?: number | null) {
	if (!latitude || !longitude) return;
	window.open(
		`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
		'_blank',
		'noopener,noreferrer',
	);
}

export { openNeshanMap, openGoogleMaps };
