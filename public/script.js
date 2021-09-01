const refreshPage = () => {
    location.reload();
}
document.querySelector('#copy-to-clipboard').addEventListener('click', () => {
    const pass = document.querySelector('#password');
    pass.select();
    pass.setSelectionRange(0, 99999);
    try {
        navigator.clipboard.writeText(pass.value);
        document.querySelector('#copy-to-clipboard').innerText = 'Copied!';
    } catch (err) {
        console.log(`Could not copy to clipboard: ${err}`);
        document.querySelector('#copy-to-clipboard').innerText = 'Error!';
    }
});