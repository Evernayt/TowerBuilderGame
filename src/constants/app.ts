import {SIZES} from './theme';

const INITIAL_DURATION = 3000;

const BOX_IMAGE_RATIO = 140.3;
const BIG_BOX_IMAGE_RATIO = 173.05;

const HEADER_HEIGHT = 30;
const MARGIN_SZIE = 10;
const MAX_BOXES = 10;

const GAME_ZONE_HEIGHT =
  SIZES.height -
  SIZES.statusBarHeight -
  SIZES.navBarHeight -
  HEADER_HEIGHT * 2 -
  MARGIN_SZIE;

const BOX_HEIGHT = GAME_ZONE_HEIGHT / 12;
const BOX_WIDTH = (BOX_HEIGHT / 100) * BOX_IMAGE_RATIO;
const BIG_BOX_HEIGHT = BOX_HEIGHT * 1.2;
const BIG_BOX_WIDTH = (BIG_BOX_HEIGHT / 100) * BIG_BOX_IMAGE_RATIO;
const CABLE_WIDTH = 5;

const INITIAL_RANGE =
  SIZES.height -
  HEADER_HEIGHT * 2 -
  BIG_BOX_HEIGHT -
  BOX_HEIGHT -
  MARGIN_SZIE -
  SIZES.statusBarHeight;

const BOX_SAFE_ZONE = (BOX_WIDTH / 100) * 43.75;
const BIG_BOX_LEFT_DANGER_ZONE =
  SIZES.width / 2 - BIG_BOX_WIDTH / 2 - BOX_SAFE_ZONE;
const BIG_BOX_RIGHT_DANGER_ZONE =
  SIZES.width - BIG_BOX_LEFT_DANGER_ZONE - BOX_WIDTH;

export {
  INITIAL_DURATION,
  HEADER_HEIGHT,
  MARGIN_SZIE,
  MAX_BOXES,
  BOX_HEIGHT,
  BOX_WIDTH,
  BIG_BOX_HEIGHT,
  BIG_BOX_WIDTH,
  CABLE_WIDTH,
  INITIAL_RANGE,
  BOX_SAFE_ZONE,
  BIG_BOX_LEFT_DANGER_ZONE,
  BIG_BOX_RIGHT_DANGER_ZONE,
};
