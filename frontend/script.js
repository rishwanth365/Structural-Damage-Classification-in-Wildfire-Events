document.addEventListener("DOMContentLoaded", function () {
    // Unique Values for Dropdowns
    const options = {
        "CAL_FIRE_Unit": ['LNU', 'AEU', 'BTU', 'SLU', 'SKU', 'SCU', 'BEU', 'LMU', 'RRU', 'BDU', 'KRN', 'NEU',
                          'SHU', 'TGU', 'LAC', 'MEU', 'MVU', 'HUU', 'TUU', 'FKU', 'MMU', 'CZU', 'ORC', 'VNC',
                          'TCU', 'SBC', 'SDU'],
        "Structure_Type": ['Single Family Residence Multi Story', 'Single Family Residence Single Story', 
                           'Utility Misc Structure', 'Mobile Home Double Wide', 'Motor Home', 
                           'Multi Family Residence Multi Story', 'Commercial Building Single Story', 
                           'Mobile Home Single Wide', 'Mixed Commercial/Residential', 'Mobile Home Triple Wide', 
                           'Infrastructure', 'School', 'Multi Family Residence Single Story', 
                           'Commercial Building Multi Story', 'Church', 'Hospital', 'Agriculture'],
        "Roof_Construction": ['Asphalt', 'Tile', 'Unknown', 'Metal', 'Concrete', 'Other', 'Wood',
                              'Combustible', 'Fire Resistant', 'No Deck/Porch'],
        "Vent_Screen": ['Mesh Screen <= 1/8""', 'Mesh Screen > 1/8""', 'Unscreened', 'Unknown',
                        'No Vents', 'Screened', '>30', '21-30', 'Deck Elevated'],
        "Exterior_Siding": ['Wood', 'Stucco/Brick/Cement', 'Unknown', 'Metal', 'Other', 'Vinyl',
                            'Ignition Resistant', 'Combustible', 'Fire Resistant'],
        "Window_Pane": ['Single Pane', 'Multi Pane', 'Unknown', 'No Windows', 'No Deck/Porch', 'Radiant Heat']
    };

    // Populate Dropdowns
    Object.keys(options).forEach(id => {
        const select = document.getElementById(id);
        options[id].forEach(value => {
            let option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    });

    // Form Submission Handling
    document.getElementById("prediction-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Extract Date Components
        let date = document.getElementById("incident_date").value;
        let [year, month, day] = date.split("-").map(Number);

        // Prepare Request Data
        let formData = {
            CAL_FIRE_Unit: document.getElementById("CAL_FIRE_Unit").value,
            Structure_Type: document.getElementById("Structure_Type").value,
            Roof_Construction: document.getElementById("Roof_Construction").value,
            Vent_Screen: document.getElementById("Vent_Screen").value,
            Exterior_Siding: document.getElementById("Exterior_Siding").value,
            Window_Pane: document.getElementById("Window_Pane").value,
            Latitude: parseFloat(document.getElementById("Latitude").value),
            Longitude: parseFloat(document.getElementById("Longitude").value),
            Incident_Start_Year: year,
            Incident_Start_Month: month,
            Incident_Start_Day: day
        };

        // Send API Request
        try {
            let response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            let data = await response.json();
            document.getElementById("result").textContent = `Predicted Damage: ${data["Predicted Damage"]}`;
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("result").textContent = "Error making prediction!";
        }
    });
});