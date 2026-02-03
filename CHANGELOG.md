## [1.0.0](https://github.com/ChargeAndTrack/frontend/compare/0.7.0...1.0.0) (2026-02-03)

### ⚠ BREAKING CHANGES

* integration between HomePage and MapPage of recharge events, add charging store

### Features

* add readonly property to FormField component ([54a51d4](https://github.com/ChargeAndTrack/frontend/commit/54a51d4d3fb66cda74158385fde663f151cc1a95))
* adjust some interfaces and create new ones; add getNearbyChargingStationsRequest ([531521c](https://github.com/ChargeAndTrack/frontend/commit/531521c0d35ebc13f69c69f66b4dd11825740431))
* integration between HomePage and MapPage of recharge events, add charging store ([b1640e1](https://github.com/ChargeAndTrack/frontend/commit/b1640e11af638305d30c09c426ff03b9dcfb5527))
* **map:** add 'charging car' view and fix marker popups ([d6914b6](https://github.com/ChargeAndTrack/frontend/commit/d6914b67a9a5917c4bc4bfc8819279376445d4d8))
* **map:** add 'find closest' functionality and car selection for plugging in ([8f81f04](https://github.com/ChargeAndTrack/frontend/commit/8f81f04b3777aa9b26f4ec242dd1a54ca7316fff))
* **map:** add getCarsRequest and overload getClosestChargingStationRequest to accept coordinates ([edf264c](https://github.com/ChargeAndTrack/frontend/commit/edf264cbd04a6e07b689be82e9fd9331c9193d3e))
* **map:** add onPlugInCar logic, extract setMarker logic into a separate function, and change icon color and modal view based on the charging station's availability ([ae965a9](https://github.com/ChargeAndTrack/frontend/commit/ae965a9caae4da8c670b8046a99b2dd2155d847b))
* **map:** add search functionality and show markers on the map; add interaction with markers and add ShowChargingStationModal component ([8770954](https://github.com/ChargeAndTrack/frontend/commit/8770954fef1f64af7b18a3246ecffada2915e5e0))
* **map:** add socket and use it for charging station updates ([236a846](https://github.com/ChargeAndTrack/frontend/commit/236a846c5dbb009bf78da14d3d6e4e94dc0b94ad))
* **map:** add startRechargeRequest ([6895498](https://github.com/ChargeAndTrack/frontend/commit/6895498cfa560cfe5154b4ffff14a5402c845f53))
* **map:** first implementation of MapPage and add MapView component; adjust SearchBar and FloatingActionButton components for MapPage, so adjust ManagePage ([ef2e4f0](https://github.com/ChargeAndTrack/frontend/commit/ef2e4f0910756cbd792daff722208a2f3c83fcac))
* split NavBar into NavBarTop and NavBarBottom components, adjust App to include navbars in the flow (not fixed), and make icons clickable links; adjust LoginPage and ProfilePage ([51be5e3](https://github.com/ChargeAndTrack/frontend/commit/51be5e3f3e616d9a1df9d5cc22b10447f031ee26))

### Bug Fixes

* remove textInput from SearchBar and add v-model in Map's SearchBar ([aefbe4a](https://github.com/ChargeAndTrack/frontend/commit/aefbe4a372f8ec4138d567c5491302d57cbe6019))

### Build and continuous integration

* **map:** add leaflet dependency ([250703c](https://github.com/ChargeAndTrack/frontend/commit/250703c4809ce72293640c19126f3c92994933c1))

### Refactoring

* add const for cars endpoint, simplify data retrieval from responses and rename ChargingStationModal as AddChargingStationModal ([8031cf4](https://github.com/ChargeAndTrack/frontend/commit/8031cf42a7c3ce71251a7d19cd91426e13ee84aa))

## [0.7.0](https://github.com/ChargeAndTrack/frontend/compare/0.6.0...0.7.0) (2026-02-03)

### Features

* **home:** add animation when updated the current battery ([3841df3](https://github.com/ChargeAndTrack/frontend/commit/3841df39abcc25a263d56bd7f3b41fdc5e962d30))
* **home:** add ChargingCarItem and ShowFieldsCard components, use ChargingCarItem in the HomePage and ShowFieldsCard in ProfileCard and ChargingStationCardExpanded components, fix SearchBar input v-model in ManagePage ([d7a52d4](https://github.com/ChargeAndTrack/frontend/commit/d7a52d420be6758c26b79432566231b1035f6d85))
* **home:** add ChargingStationItem and ListItemsCard components, so add them to the HomePage; refactor CarsCard component using ListItemsCard component ([803dfe9](https://github.com/ChargeAndTrack/frontend/commit/803dfe9bfa8d2531e5f277a9f6ea2740af757596))
* **home:** add houseNumber to Address interface and formatAddress function ([7afb0d0](https://github.com/ChargeAndTrack/frontend/commit/7afb0d0d6dcc91d39ec6976c89f0f4a290bbc526))
* **home:** add listener to recharge-update events to update current battery dinamically and stop recharge handler ([70f0d59](https://github.com/ChargeAndTrack/frontend/commit/70f0d59b1eb3ae28222bb92a8dfba6a07bd67d11))
* **home:** add llmSearchRequest and its handler in HomePage, add v-model to SearchBar textarea, add clear button to ListItemsCard and stop recharge button to ChargingStationItem ([a509223](https://github.com/ChargeAndTrack/frontend/commit/a50922319fb1beb5f9366422d490fbc6fe8e8399))
* **home:** create Socket instance, add _id to ChargingStation interface and add ChargingStationBody interface, add getChargingStationRequest and stopRechargeRequest ([e2ff161](https://github.com/ChargeAndTrack/frontend/commit/e2ff1616c751d692747d0f9a18aefb5480bca950))
* replace input with slot in SearchBar component, add SearchBar to HomePage and modify its implementation in ManagePage ([7a96395](https://github.com/ChargeAndTrack/frontend/commit/7a96395a7fa7783f61233e7e380f9d3a85a4bffa))

### Build and continuous integration

* add socket.io-client dependency ([69cfb9a](https://github.com/ChargeAndTrack/frontend/commit/69cfb9ae057d4fb041597952045b310cdbd77e39))

## [0.6.0](https://github.com/ChargeAndTrack/frontend/compare/0.5.0...0.6.0) (2026-01-30)

### Features

* **profile:** use global error handling in ProfilePage ([9077ed6](https://github.com/ChargeAndTrack/frontend/commit/9077ed6bfd0d2a92dc9e77e31c18e9108778c46c))

### Refactoring

* priority to error message from backend if present, replace ifs with try-catch and remove useless MessageToasts ([515e49f](https://github.com/ChargeAndTrack/frontend/commit/515e49f69e49f8a48e1bb9ec8c34cb3e3d0f814f))

## [0.5.0](https://github.com/ChargeAndTrack/frontend/compare/0.4.0...0.5.0) (2026-01-29)

### Features

* add global error handling ([8719896](https://github.com/ChargeAndTrack/frontend/commit/8719896dc740f2c9e8e4b3aa1e42e1f907a52cd6))
* **manage:** add addChargingStation request, add onlyEnabledAndAvailable param in getClosestChargingStationRequest,change coordinates type in GeoPoint interface and remove houseNumber from Address interface ([9521e7a](https://github.com/ChargeAndTrack/frontend/commit/9521e7a788598a98e233f864938adea4506c08f4))
* **manage:** add ChargingStation interface, add modal component to insert a charging station, add props and events for toggling the modal ([e123777](https://github.com/ChargeAndTrack/frontend/commit/e123777b0b2f2dd0008f9cb218479abddbfcfd0c))
* **manage:** add ConfirmDeleteModal component, move remove and update charging station requests to ManagePage, add form tag to ChargingStationCardExpanded ([97c6915](https://github.com/ChargeAndTrack/frontend/commit/97c69154120b2ca1e3259198c2138b3b00d2a270))
* **manage:** add Coordinates, GeoPoint and Address interfaces; add location and getClosestChargingStation requests ([9d9f36c](https://github.com/ChargeAndTrack/frontend/commit/9d9f36c2c794700210238f4de3b4d70ba7e4192e))
* **manage:** add form tag with required attribute in inputs ([eda51b6](https://github.com/ChargeAndTrack/frontend/commit/eda51b64ac9419a6b3d96331f0784e886fefa696))
* **manage:** add LoadingSpinner component and show it while searching a charging station, hide charging station card until searched one ([b5c34a1](https://github.com/ChargeAndTrack/frontend/commit/b5c34a1b7168249dc22d4eef27832d4ee3fb9a1e))
* **manage:** add remove and update charging station requests, add MessageToast component and show it after a charging station's update ([ef4a8c5](https://github.com/ChargeAndTrack/frontend/commit/ef4a8c52beb4bd786683c651b77537b2de9b621a))
* **manage:** first implementation of ManagePage by adding SearchBar, ChargingStationCardExpanded and FloatingActionButton components; small changes in custom theme and navbar ([f46ea6d](https://github.com/ChargeAndTrack/frontend/commit/f46ea6db26c304c7729f681bb95b401259947f71))
* **manage:** implement searchClosestChargingStation by adding search event in the searchBar, add 'add-charging-station' event to ChargingStationModal, implement ChargingStationCardExpanded data visualization ([16f056f](https://github.com/ChargeAndTrack/frontend/commit/16f056fa1367620f5d47380d37968d9bc6d5b228))

## [0.4.0](https://github.com/ChargeAndTrack/frontend/compare/0.3.0...0.4.0) (2026-01-29)

### Features

* **profile:** add addCarRequest, add AddCarModal and handle add car; extract FormField component ([0fc41a5](https://github.com/ChargeAndTrack/frontend/commit/0fc41a50592bc7d8d9c6cbfbd1f74b0491812a54))
* **profile:** add deleteCarRequest, add ConfirmDeleteModal component and handle delete car ([4486ff3](https://github.com/ChargeAndTrack/frontend/commit/4486ff354228e3de81d87bd0de3d5eb93953d78e))
* **profile:** add getCarRequest and updateCarRequest, update AddCarModal (renamed as CarModal) to use it for both adding and editing, and handle edit car; rename AddCarBody as CarBody ([f7b60a1](https://github.com/ChargeAndTrack/frontend/commit/f7b60a1cba89b22cbc14df2f02b75a1d13c8af32))
* **profile:** add two new error messages, add function to format role and change some buttons style ([b07bbd8](https://github.com/ChargeAndTrack/frontend/commit/b07bbd82da20871a7e96eaf6ca5f749ae5d2f6c1))
* **profile:** add User and Car interfaces, add getUser request and call in ProfilePage; use icon in add button ([5f54279](https://github.com/ChargeAndTrack/frontend/commit/5f54279a077a6610ac0923654bbf49a6a7844e0f))
* **profile:** first implementation of ProfilePage and refactor LoginPage extracting a component ([7402af7](https://github.com/ChargeAndTrack/frontend/commit/7402af785c83b5dfd771a181559d49993d412da8))

### Refactoring

* **profile:** extract components ProfileCard (containing ProfileField(s)) and CarsCard (containing CarItem(s)) from ProfilePage ([7aff5c0](https://github.com/ChargeAndTrack/frontend/commit/7aff5c0fb2c2dfdcdb23697704b27a7c44a15ecb))
* **profile:** rename show-password as showPassword ([eee1482](https://github.com/ChargeAndTrack/frontend/commit/eee1482ea375f5667c4301f80dff9ca50401ce17))

## [0.3.0](https://github.com/ChargeAndTrack/frontend/compare/0.2.0...0.3.0) (2026-01-26)

### Features

* **login:** add login page and move paths reachable from navbar as '/' children ([e641c10](https://github.com/ChargeAndTrack/frontend/commit/e641c101e06ca17b1e81408d9cc93f533c6518c0))
* **login:** add login submit handler and add navigation guard for authentication ([dac6710](https://github.com/ChargeAndTrack/frontend/commit/dac6710d77763e68fccf577f5b577613811defa3))
* **login:** add user role to authentication store, add forbidden page, make path '/manage' accessible and relative page visible on navbar only with admin role ([0fc0abb](https://github.com/ChargeAndTrack/frontend/commit/0fc0abbc4d7a4f1f5c79e43344f8d4d5947f861d))
* **login:** define authentication store, create axios instance with baseURL and headers, define login request ([d21c2d0](https://github.com/ChargeAndTrack/frontend/commit/d21c2d0d954f53027dc99d509ec248cb21e02de3))

### Build and continuous integration

* add pinia dependency ([fe0ab27](https://github.com/ChargeAndTrack/frontend/commit/fe0ab274624b2ad70c5c2902dadda365cde978f0))

## [0.2.0](https://github.com/ChargeAndTrack/frontend/compare/0.1.0...0.2.0) (2026-01-24)

### Features

* **navigation:** add router, define pages and first implementation of NavBar components ([b20a199](https://github.com/ChargeAndTrack/frontend/commit/b20a199cba97be31e5243c89c62d679fb5647b98))
* **navigation:** remove login from navbar, implement mobile navbar view and add icons ([328ffea](https://github.com/ChargeAndTrack/frontend/commit/328ffeaf7a1236a43d1c476e573a066435cba389))
* **style:** add custom.scss theme ([92fe41f](https://github.com/ChargeAndTrack/frontend/commit/92fe41fbeab2139d82da97a9f42fe143140de5e2))

### Build and continuous integration

* add build and release workflows; sync package.lock ([3e6f02e](https://github.com/ChargeAndTrack/frontend/commit/3e6f02e4765de05f2200fa15a852c5b1730fd3d6))
* add semantic-release configuration ([4798536](https://github.com/ChargeAndTrack/frontend/commit/479853661988029a8993d32cd20da91afe4d231b))
* config alias for absolute path ([bc5344b](https://github.com/ChargeAndTrack/frontend/commit/bc5344bf55732903cc9694cdcc5ae24cf11bd8c4))
* **navigation:** add vue-router dependency ([9c123c3](https://github.com/ChargeAndTrack/frontend/commit/9c123c39d49486410e5bcaabc5d86e9c91089a59))
* **style:** add sass dependency ([5a51992](https://github.com/ChargeAndTrack/frontend/commit/5a519924ace4f8adb9351dbbd5b27b6cc54a4b38))
