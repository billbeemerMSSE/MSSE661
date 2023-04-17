const doAddShoot = async (event) => {
    // event.preventDefault();

    const clientInput = document.getElementById('formInputShootClient');
    const shoot_client = clientInput.value;
    const caterInput = document.getElementById('formInputShootCater');
    const shoot_cater = caterInput.value;

    if (!shoot_client) {
        alert("Please enter a Client name.");
        return;
    }

    if (!shoot_cater) {
        alert("Please enter a Cater number.");
        return;
    }

    const response = await createShoot({ shoot_client, shoot_cater });

    if (response !== null) {
        inst.generateShoots;
    }
    clientInput.value = "";
    caterInput.value = "";
};