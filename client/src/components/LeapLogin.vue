<template>
  <div class="container">
    <button @click="connectWallet">
      {{ authStore.isAuthenticated ? "Connected" : "Login with Leap Wallet" }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const connectWallet = async () => {
      if (!window.leap) {
        alert("Please install Leap Wallet extension");
        return;
      }

      const arabicaParams = {
        chainId: "arabica-11",
        chainName: "Arabica devnet",
        rpc: "https://rpc.celestia-arabica-11.com/",
        rest: "https://api.celestia-arabica-11.com/",
      };

      try {
        if (window.leap.experimentalSuggestChain) {
          await window.leap.experimentalSuggestChain({
            ...arabicaParams,
            bip44: { coinType: 118 },
            bech32Config: {
              bech32PrefixAccAddr: "celestia",
              bech32PrefixAccPub: "celestia" + "pub",
              bech32PrefixValAddr: "celestia" + "valoper",
              bech32PrefixValPub: "celestia" + "valoperpub",
              bech32PrefixConsAddr: "celestia" + "valcons",
              bech32PrefixConsPub: "celestia" + "valconspub",
            },
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
                gasPriceStep: { low: 0.01, average: 0.02, high: 0.1 },
              },
            ],
            stakeCurrency: {
              coinDenom: "TIA",
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
            },
          });
        }

        await window.leap.enable(arabicaParams.chainId);
        const accounts = await window.leap.getKey(arabicaParams.chainId);

        authStore.login(accounts.bech32Address);
        alert(`Connected: ${accounts.bech32Address}`);

        // Gửi địa chỉ ví lên backend
        const response = await fetch(
          "http://localhost:5000/api/users/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: accounts.bech32Address }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          console.log("User registered:", result);
        } else {
          console.error("Registration failed:", result);
          alert(result.message || "Failed to register");
        }

        // Chuyển hướng sang trang Home
        router.push("/");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet");
      }
    };

    return { authStore, connectWallet };
  },
});
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
button:hover {
  background: #5ac089;
}
</style>
