<template>
  <div class="container">
    <button @click="addLeapNetwork">Login with Leap wallet</button>
  </div>
</template>

<script>
export default {
  methods: {
    async addLeapNetwork() {
      if (!window.leap) {
        alert("Please install Leap Wallet extension");
        return;
      }

      const arabicaParams = {
        chainId: "arabica-11",
        chainName: "Arabica devnet",
        rpc: "https://rpc.celestia-arabica-11.com/",
        rest: "https://api.celestia-arabica-11.com/",
        currencies: [
          {
            coinDenom: "TIA",
            coinMinimalDenom: "utia",
            coinDecimals: 6,
            coinGeckoId: "celestia",
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "TIA",
            coinMinimalDenom: "utia",
            coinDecimals: 6,
            coinGeckoId: "celestia",
            gasPriceStep: {
              low: 0.01,
              average: 0.02,
              high: 0.1,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "TIA",
          coinMinimalDenom: "utia",
          coinDecimals: 6,
          coinGeckoId: "celestia",
        },
      };

      try {
        if (window.leap.experimentalSuggestChain) {
          await window.leap.experimentalSuggestChain({
            chainId: arabicaParams.chainId,
            chainName: arabicaParams.chainName,
            rpc: arabicaParams.rpc,
            rest: arabicaParams.rest,
            bip44: { coinType: 118 },
            bech32Config: {
              bech32PrefixAccAddr: "celestia",
              bech32PrefixAccPub: "celestia" + "pub",
              bech32PrefixValAddr: "celestia" + "valoper",
              bech32PrefixValPub: "celestia" + "valoperpub",
              bech32PrefixConsAddr: "celestia" + "valcons",
              bech32PrefixConsPub: "celestia" + "valconspub",
            },
            currencies: arabicaParams.currencies,
            feeCurrencies: arabicaParams.feeCurrencies,
            stakeCurrency: arabicaParams.stakeCurrency,
          });
          alert(
            `Successfully added ${arabicaParams.chainName} to Leap wallet!`
          );
        }

        await window.leap.enable(arabicaParams.chainId);
      } catch (error) {
        console.error("Failed to add network:", error);
        alert("Failed to add the network");
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}
button {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #6ad99c;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
}
</style>
