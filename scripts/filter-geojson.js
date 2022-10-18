const fs = require('fs-extra');
const simplify = require('simplify-geojson');
async function parse() {
    try {
        const packageObj = await fs.readJson('./data/resultats_elections_cumul_presidentielles_rennes.geojson');
        let finalCollection = {
            type: 'FeatureCollection',
            features: [],
        };
        packageObj.features.forEach((feature) => {
            if (
                (feature.properties.nom_election === 'ELECTIONS PRÉSIDENTIELLE 2022' || feature.properties.nom_election === 'ELECTIONS PRESIDENTIELLES 2022') &&
                feature.properties.nb_inscrits < 50000 &&
                feature.geometry
            ) {
                finalCollection.features.push(feature);
            }
        });
        //console.log(finalCollection);

        finalCollection = simplify(finalCollection, 0.001);

        fs.writeJson('./src/resultats_elections_cumul_presidentielles_rennes_2022.geojson', finalCollection, (err) => {
            if (err) return console.error(err);
            console.log('success!');
        });
    } catch (err) {
        console.error(err);
    }
}

parse();
