# Media Share
A tool to help with watch party for private viewing.

## Building the server
The server is built using docker, but you could use the script to set up your own server. 

```
docker build . -t rtmp-server
```

## Running the server

```
docker run -d rtmp-server
```

## Streaming
### OBS
To set up OBS to stream to this server you will need to set the following config:

```
Server URL: rtmp://<IP_ADDR>/live
Stream Key: live
```

### FFMPEG

**Capturing Screen**
```
ffmpeg -video_size WIDTHxHEIGHT -framerate FPS -f x11grab -i :0.0+OFFX,OFFY output.mp4
```

**Capture Screen with ALSA**
```
ffmpeg -video_size WIDTHxHEIGHT -framerate FPS -f x11grab -i :0.0+OFFX,OFFY -f alsa -ac 2 -i hw:0 output.mkv
```

**Capture Screen with Pulse**
```
ffmpeg -video_size WIDTHxHEIGHT -framerate FPS -f x11grab -i :0.0+OFFX,OFFY -f pulse -ac 2 -i default output.mkv
```

**Streaming with RTMP**

```
ffmpeg -re -i "output.mkv" -c:v copy -c:a aac -ar 44100 -ac 1 -f flv rtmp://IP_ADDR/live/live
```

`-re` specifies that input will be read at its native framerate.

`-i` path to our input file.

`-c:v` set to copy, meaning that you’re copying over the video format

`-c:a` has other parameters, namely `aac -ar 44100 -ac 1`, because you need to resample the audio to an RTMP-friendly format. `aac` is a widely supported audio codec, `44100 hz` is a common frequency, and `-ac 1` specifies the first version of the AAC spec for compatibility purposes.

`-f` flv wraps the video in an flv format container for maximum compatibility with RTMP.


**Varibles**

WIDTH: Width of stream

Height: Height of stream

FPS: Frames per Second of the stream

OFFX: Screen X offset

OFFY: Screen Y offset

### VLC
If there is a will there is a way.

## Playback
Use VLC.

1. MEDIA > Open Network Stream.
2. Enter URL: `rmtp://IP_ADDR/live/live`
3. Play
