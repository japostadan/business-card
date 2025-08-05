
function pulseAvatar() {
	const avatar = document.querySelector('.avatar');
	avatar.style.transform = 'scale(1.2)';
	setTimeout(() => {
		avatar.style.transform = 'scale(1)';
	}, 200);
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		showNotification('Copied to clipboard!');
	}).catch(() => {
		showNotification('Failed to copy');
	});
}

function showNotification(message) {
	const notification = document.createElement('div');
	notification.textContent = message;
	notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgb(15, 130, 140);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease forwards';
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 2000);
}

function downloadCard() {
	const vCard = `BEGIN:VCARD
VERSION:3.0
FN:James Postadan
ORG:Web Development
TITLE:Full-Stack Web Developer
EMAIL:jamespostadan@protonmail.com
TEL:+63 604 192 601
URL:https://japostadan.dev
NOTE:JavaScript | React | Node.js | Python | CSS3 | MongoDB | AWS
END:VCARD`;

	const blob = new Blob([vCard], { type: 'text/vcard' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'postadan.vcf';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);

	showNotification('Contact card downloaded!');
}

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
document.head.appendChild(style);

// Add subtle parallax effect on mouse move
//document.addEventListener('mousemove', (e) => {
//	const card = document.querySelector('.card');
//	const rect = card.getBoundingClientRect();
//	const x = e.clientX - rect.left;
//	const y = e.clientY - rect.top;
//
//	const centerX = rect.width / 2;
//	const centerY = rect.height / 2;
//
//	const rotateX = (y - centerY) / 10;
//	const rotateY = (centerX - x) / 10;
//
//	card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
//});

document.addEventListener('mouseleave', () => {
	const card = document.querySelector('.card');
	card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
});
