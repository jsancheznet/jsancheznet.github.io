# Changelog

## [0.5.6] - 17-6-2022

### Added
- Ghosts now have a function to choose their next tile, it works the same way as in the original pacman 1980
- Program is now ready for the different ghost's behaviours
- Implemented Blinky's behaviour
- Implemented Clyde's behaviour
- Implemented Pinky's behaviour
- Implemented Inky's behaviour
- Agregue Documento de diseño llamado Design.pdf

## [0.5.5] - 16-6-2022

### Changed
- Modified Pathmap class, now it's called MapTile and only has two member variables, x & y, and no functions
- Everytile is no longer stored and linearly searched, we now only store valid map tiles (valid map tiles are less than invalid tiles, so linear search will be faster).
- World::ValidTiles is now a vector instead of a list, faster linear search

### Removed
- Removed all code related to pathfiding, it was too slow, not easy to understand and i'm 99% sure it was not creating optimal paths.
- Ghost now dont call path find.

## [0.5.4] - 14-6-2022

### Changed
- Image files reexported in order to prevent libpng to emit a warning
- Cleaned up Drawer->GetFontResource, it was mostly unused code
- BigDots and SmallDots now reuse the same sprite. Before this change each dot instance loaded its own sprite, the game now loads much faster.
- Avatar no longer stops moving when the next tile would be an invalid tile, ex: pressing up when there's a wall up. It keeps moving.
- Pacman::SetFPS now uses a string instead of stream

### Removed
- Commented/Deprecated Drawer::DrawText Function, it's called nowhere, at least for now.

### Fixed
- Fixed a memory leak caused by not freeing SDL_Texture * these textures where is for rendering Score, Lives, FPS, used to leak one texture per frame

## [0.5.3] - 13-6-2022

### Added
- Ghost now have a Name, Blink (Red), Pinky (Pink), Inky (Blue), Clyde (Orange). Now i'm ready to implement the different ghost behaviours

## [0.5.2] - 12-6-2022

### Added
- Ghosts now have different color sprites

### Changed

- The two lower big dots of the map are now placed in the same tile as the original Pacman
- Reworked the sprite class and how textures are loaded
- The functions World::InitDots, World::InitBigDots, World::InitPathmap are now in a single function called InitMap. These 3 separate functions used to traverse the mat.txt files 3 times separately, now we only process it once.

## [0.5.1] - 11-6-2022

### Added
- Big dots now have a score gain of 50
- Avatar now changes sprite according to the direction it is moving

### Removed
- Removed empty destructors to help me with readability

## [0.5.0] - 10-6-2022

### Added
- Created git repository
- Created project Changelog
- Application now responds to an SDL_QUIT event and exits correctly
