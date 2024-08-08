import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, MicOff, Video, VideoOff, Phone, Sun, PhoneCall } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { parsePhoneNumber } from 'libphonenumber-js';

const CallPage = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callLog, setCallLog] = useState([]);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    let interval;
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

      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCalling]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleCall = () => {
    if (!isCalling && !phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number to call.",
        variant: "destructive",
      });
      return;
    }

    setIsCalling(!isCalling);
    if (!isCalling) {
      toast({
        title: "Call Started",
        description: `Calling ${phoneNumber}`,
      });
      setCallLog(prev => [...prev, { number: phoneNumber, timestamp: new Date(), duration: 0 }]);
    } else {
      toast({
        title: "Call Ended",
        description: `Call duration: ${formatDuration(callDuration)}`,
      });
      setCallLog(prev => prev.map((log, index) => 
        index === prev.length - 1 ? { ...log, duration: callDuration } : log
      ));
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

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    const parsedNumber = parsePhoneNumber(input, 'US');
    if (parsedNumber) {
      setPhoneNumber(parsedNumber.formatNational());
    } else {
      setPhoneNumber(input);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
          {isCalling && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {formatDuration(callDuration)}
            </div>
          )}
        </div>
        <Input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="mb-4"
        />
        <div className="flex justify-center space-x-4 mb-4">
          <Button onClick={toggleAudio} variant={isAudioMuted ? "destructive" : "default"}>
            {isAudioMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button onClick={toggleVideo} variant={isVideoOff ? "destructive" : "default"}>
            {isVideoOff ? <VideoOff /> : <Video />}
          </Button>
          <Button onClick={toggleCall} variant={isCalling ? "destructive" : "default"}>
            {isCalling ? <Phone /> : <PhoneCall />}
          </Button>
          <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "default"}>
            {isRecording ? "Stop" : "Rec"}
          </Button>
          <Button onClick={toggleFlashlight} variant={isFlashlightOn ? "default" : "outline"}>
            <Sun />
          </Button>
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Call Log</h3>
          <ul className="space-y-2">
            {callLog.slice(-5).reverse().map((log, index) => (
              <li key={index} className="text-sm">
                {log.number} - {new Date(log.timestamp).toLocaleTimeString()} ({formatDuration(log.duration)})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
