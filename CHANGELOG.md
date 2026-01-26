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
