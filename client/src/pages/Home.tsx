import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import { Loader2, AlertCircle } from 'lucide-react';
import type { WeatherData } from '@/types/WeatherTypes';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const weatherMutation = useMutation({
    mutationFn: async (city: string) => {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch weather data' }));
        throw new Error(errorData.message || 'Failed to fetch weather data', {
          cause: { status: response.status, data: errorData }
        });
      }
      
      const data = await response.json();
      return data as WeatherData;
    },
    onSuccess: (data) => {
      setWeather(data);
    },
    onError: () => {
      setWeather(null);
    },
  });

  const getBackgroundGradient = () => {
    if (!weather) {
      return 'from-blue-400 via-blue-500 to-blue-600';
    }

    const condition = weather.weather[0].main;
    
    switch (condition) {
      case 'Clear':
        return 'from-amber-400 via-orange-400 to-pink-500';
      case 'Clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'Rain':
      case 'Drizzle':
        return 'from-blue-500 via-blue-600 to-indigo-700';
      case 'Thunderstorm':
        return 'from-gray-700 via-gray-800 to-gray-900';
      case 'Snow':
        return 'from-blue-100 via-blue-200 to-blue-300';
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  const handleSearch = (city: string) => {
    weatherMutation.mutate(city);
  };

  const getErrorMessage = () => {
    if (!weatherMutation.error) return '';
    
    const error = weatherMutation.error as Error & { cause?: { status?: number; data?: any } };
    const message = error.message;
    const status = error.cause?.status;
    
    if (status === 404 || message?.toLowerCase().includes('city not found')) {
      return 'City not found. Please check the spelling and try again.';
    } else if (status === 400) {
      return 'Please enter a valid city name.';
    } else if (status === 500) {
      return message || 'Failed to fetch weather data. Please try again.';
    } else {
      return message || 'Failed to fetch weather data. Please try again.';
    }
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 ease-in-out flex flex-col items-center justify-center px-4 py-8`}
      data-testid="container-weather-dashboard"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Dashboard
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Search for any city to get real-time weather information
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={weatherMutation.isPending} />

        {weatherMutation.isPending && (
          <div className="flex flex-col items-center justify-center py-12" data-testid="loading-state">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
            <p className="text-lg text-white mt-4">Loading weather data...</p>
          </div>
        )}

        {weatherMutation.isError && (
          <div 
            className="flex flex-col items-center justify-center py-12 backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20"
            data-testid="error-state"
          >
            <AlertCircle className="w-12 h-12 text-white mb-4" />
            <p className="text-lg font-medium text-white text-center max-w-md" data-testid="text-error-message">
              {getErrorMessage()}
            </p>
            <Button 
              onClick={() => weatherMutation.reset()}
              variant="outline"
              className="mt-6 bg-white/20 border-white/30 text-white hover:bg-white/30"
              data-testid="button-dismiss-error"
            >
              Dismiss
            </Button>
          </div>
        )}

        {!weatherMutation.isPending && !weatherMutation.isError && weather && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherCard weather={weather} />
          </div>
        )}

        {!weatherMutation.isPending && !weatherMutation.isError && !weather && (
          <div className="text-center py-12">
            <p className="text-xl text-white/80">
              Enter a city name above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
