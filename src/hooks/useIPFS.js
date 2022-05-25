export const useIPFS = () => {
    const resolveLink = (url) => {
      if (!url || !url.includes("ipfs://")) return url;
      return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/"); //used to ensure that the data is fitched from ipfs database to the app
    };
  
    return { resolveLink };
  };