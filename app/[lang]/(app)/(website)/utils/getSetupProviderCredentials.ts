interface SetupProviderCredentials {
 channelID: string;
 providerID: string;
 hotelID: string;
 arzID: string;
}

function getSetupProviderCredentials(): SetupProviderCredentials {
 return {
  channelID: process.env.NEXT_PUBLIC_CHANNELID || '-1',
  providerID: process.env.NEXT_PUBLIC_PROVIDERID || '1',
  hotelID: process.env.NEXT_PUBLIC_HOTELID || '1',
  arzID: process.env.NEXT_PUBLIC_ARZID || '1',
 };
}

export type { SetupProviderCredentials };
export { getSetupProviderCredentials };
