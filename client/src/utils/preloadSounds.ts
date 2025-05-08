export function preloadSounds(paths: string[]): void {
	paths.forEach((path) => {
	  const audio = new Audio(path);
	  audio.load();
	});
  }
  