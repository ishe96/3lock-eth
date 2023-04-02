// https://eth-ropsten.alchemyapi.io/v2/qmNSRrbc4ZbyVEuQlZrnFtJUB1UXGA_g

require('@nomiclabs/hardhat-waffle');

// module.exports = {
//     solidity: '0.8.0',
//     networks: {
//         mumbai:{
//             url: 'https://eth-ropsten.alchemyapi.io/v2/qmNSRrbc4ZbyVEuQlZrnFtJUB1UXGA_g',
//             accounts:['39d99e4e23b8088672c4fc1b390c03fb60804ce88ea0135fd2086ea32802821b']
//         }
//     } 
// }

module.exports = {
    solidity: '0.8.0',
    networks: {
        mumbai:{
            url: 'https://polygon-mumbai.g.alchemy.com/v2/VhT7rJdwQ3g_NV6-vRjS_QtU02b7yoom',
            accounts:['39d99e4e23b8088672c4fc1b390c03fb60804ce88ea0135fd2086ea32802821b']
        }
    } 
}