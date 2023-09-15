import { useCompletion } from "ai/react";
import { Github, Wand2 } from "lucide-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromptSelect from "./components/promptSelect";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import { Textarea } from "./components/ui/textarea";
import VideoInputForm from "./components/videoInputForm";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <>
      <ToastContainer />
      <div className='min-h-screen flex flex-col'>
        <div className='px-6 py-3 flex items-center justify-between border-b'>
          <h1 className='text-xl font-bold'>Upload AI</h1>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-muted-foreground'>
              Desenvolvido com ❤️ no NLW
            </span>

            <Separator
              orientation='vertical'
              className='h-6'
            />
            <Button variant='outline'>
              <Github className='w-4 h-4 mr-2' />
              Github
            </Button>
          </div>
        </div>
        <main className='flex-1 p-6 flex gap-6'>
          <div className='flex flex-col flex-1 gap-4'>
            <div className='grid grid-rows-2 gap-4 flex-1'>
              <Textarea
                className='resize-none p-4 leading-relaxed'
                placeholder='Inclua o prompt para a IA...'
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                className='resize-none p-4 leading-relaxed'
                placeholder='Resultado gerado pela IA...'
                readOnly
                defaultValue={completion}
              />
            </div>

            <p className='text-sm text-muted-foreground'>
              Lembre-se: você pode usar a variável{" "}
              <code className='text-violet-400'>{"{transcription}"}</code> no
              seu promp para adicionar o conteúdo da transcrição do vídeo
              selecionado.
            </p>
          </div>

          <aside className='w-80 space-y-6'>
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form
              action=''
              className='space-y-6'
              onSubmit={handleSubmit}
            >
              <div className='space-y-2'>
                <Label htmlFor='model'>Prompt</Label>
                <PromptSelect onPromptSelected={setInput} />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='model'>Modelo</Label>
                <Select
                  disabled
                  defaultValue='gpt3.5'
                >
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className='block text-xs text-muted-foreground italic'>
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <Separator />

              <div className='space-y-4'>
                <Label htmlFor='temperature'>Temperatura</Label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />

                <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                  Valores mais altos tendem a deixar o texto mais criativo, mas
                  com possíveis erros.
                </span>
              </div>

              <Separator />

              <Button
                type='submit'
                className='w-full'
                disabled={isLoading}
              >
                Executar
                <Wand2 className='w-4 h-4 ml-2' />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </>
  );
}
