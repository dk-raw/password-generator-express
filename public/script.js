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
(() => {
    'use strict'
    let forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
})();