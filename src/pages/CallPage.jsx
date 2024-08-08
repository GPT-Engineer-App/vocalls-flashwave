import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, MicOff, Video, VideoOff, Phone, Sun } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CallPage = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const videoRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isCalling) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing media devices:", err);
          toast({
            title: "Error",
            description: "Failed to access camera and microphone.",
            variant: "destructive",
          });
        });
    }
  }, [isCalling]);

  const toggleCall = () => {
    setIsCalling(!isCalling);
    if (!isCalling) {
      toast({
        title: "Call Started",
        description: "You've started a new call.",
      });
    } else {
      toast({
        title: "Call Ended",
        description: "Your call has ended.",
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    toast({
      title: isAudioMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: isAudioMuted ? "Your microphone is now on." : "Your microphone is now off.",
    });
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: isVideoOff ? "Video Turned On" : "Video Turned Off",
      description: isVideoOff ? "Your camera is now on." : "Your camera is now off.",
    });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Your call recording has stopped." : "Your call is now being recorded.",
    });
  };

  const toggleFlashlight = () => {
    setIsFlashlightOn(!isFlashlightOn);
    toast({
      title: isFlashlightOn ? "Flashlight Off" : "Flashlight On",
      description: isFlashlightOn ? "Flashlight has been turned off." : "Flashlight has been turned on.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4 relative">
          {isCalling ? (
            <video ref={videoRef} autoPlay muted className="w-full h-64 bg-black rounded-lg" />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <Camera size={48} className="text-gray-500" />
            </div>
          )}
          {isFlashlightOn && (
            <div className="absolute inset-0 bg-yellow-200 opacity-50 rounded-lg"></div>
          )}
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={toggleAudio} variant={isAudioMuted ? "destructive" : "default"}>
            {isAudioMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button onClick={toggleVideo} variant={isVideoOff ? "destructive" : "default"}>
            {isVideoOff ? <VideoOff /> : <Video />}
          </Button>
          <Button onClick={toggleCall} variant={isCalling ? "destructive" : "default"}>
            <Phone />
          </Button>
          <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "default"}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button onClick={toggleFlashlight} variant={isFlashlightOn ? "default" : "outline"}>
            <Sun />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
