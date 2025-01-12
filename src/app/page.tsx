"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Copy, Check, RefreshCcw } from "lucide-react";
import zxcvbn from "zxcvbn";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [strength, setStrength] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+{}[]|:;<>,.?/~";

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    const result = zxcvbn(password);
    setStrength(result.score - 1);
  }, [password]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-lime-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Password Generator
        </h1>

        <div className="mb-4 flex gap-x-2">
          <Input
            value={password}
            readOnly
            className="w-full text-center font-mono text-lg"
          />
          <Button onClick={generatePassword} className="w-6">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-2">Password Strength:</div>
          <div className={`h-2 w-full rounded ${getStrengthColor()}`}></div>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-2">Password Length: {length[0]}</div>
          <Slider
            value={length}
            onValueChange={setLength}
            max={32}
            min={1}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="uppercase"
              checked={uppercase}
              onCheckedChange={(checked) => setUppercase(checked === true)}
            />
            <label htmlFor="uppercase" className="ml-2 text-sm">
              Uppercase letters
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="lowercase"
              checked={lowercase}
              onCheckedChange={(checked) => setLowercase(checked === true)}
            />
            <label htmlFor="lowercase" className="ml-2 text-sm">
              Lowercase letters
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="numbers"
              checked={numbers}
              onCheckedChange={(checked) => setNumbers(checked === true)}
            />
            <label htmlFor="numbers" className="ml-2 text-sm">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="symbols"
              checked={symbols}
              onCheckedChange={(checked) => setSymbols(checked === true)}
            />
            <label htmlFor="symbols" className="ml-2 text-sm">
              Symbols
            </label>
          </div>
        </div>

        <motion.div
          className="w-full mt-6"
          initial={false}
          animate={isCopied ? { scale: [1, 1.1, 1] } : {}}
        >
          <Button
            onClick={copyToClipboard}
            className={`w-full ${isCopied ? "bg-green-500" : ""}`}
            variant={isCopied ? "default" : "default"}
          >
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy password
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
