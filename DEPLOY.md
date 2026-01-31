## Next js Project
booking is a next js project,you can read README.md for more information about deployment and configuration.

## ENV
to run the project you need to create .env.development for development environment and .env.production for production environment.

.env file key values 
```
NEXT_PUBLIC_MODE  // development or production
NEXT_PUBLIC_CHANNELID // your channel id or empty
NEXT_PUBLIC_PROVIDERID // your provider id or empty
NEXT_PUBLIC_HOTELID // your hotel id or empty
NEXT_PUBLIC_ARZID // your arz id or empty
NEXT_PUBLIC_API_URI // your api uri or empty for example https://crsapi.crs-booking.com/Api
NEXT_PUBLIC_X_AUTH  // your x-auth token or empty
```

if NEXT_PUBLIC_HOTELID is set user will be redirected to hotel page automatically.
