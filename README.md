# Film Glow Studio

Professional analog film effects for digital photos.

## Features

- **Film Stock Emulation**: Kodak Vision3 and Fujifilm profiles
- **Halation Effect**: Authentic red glow around highlights
- **Bloom**: Soft white glow for dreamy aesthetics
- **Film Grain**: Customizable size and distribution
- **Basic Adjustments**: Temperature, contrast, shadows, highlights, saturation, vibrance
- **Effects**: Vignette, sharpness, softness

## Technologies

- React + TypeScript
- Vite
- Photon (WebAssembly image processing)
- shadcn-ui + Tailwind CSS

## Development

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Docker

### Using Docker Compose

```sh
docker-compose up -d
```

### Manual Docker

```sh
# Build image
docker build -t film-glow-studio .

# Run container
docker run -p 8080:80 film-glow-studio
```

### Pull from GitHub Container Registry

```sh
docker pull ghcr.io/flapenta/film-glow-studio:latest
docker run -p 8080:80 ghcr.io/flapenta/film-glow-studio:latest
```

Access at http://localhost:8080

## CI/CD

The project includes a GitHub Actions workflow that automatically:
- Builds the Docker image on push to main/master
- Tags images with version numbers (on git tags)
- Pushes to GitHub Container Registry (ghcr.io)
- Uses build cache for faster builds
