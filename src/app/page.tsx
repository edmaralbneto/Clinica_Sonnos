"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";

interface Question {
  id: string;
  text: string;
  type: "yes-no" | "scale";
  options?: string[];
}

const questions: Question[] = [
  {
    id: "snoring",
    text: "Você costuma roncar?",
    type: "yes-no",
  },
  {
    id: "breathing_pauses",
    text: "Alguém já notou que você para de respirar durante o sono?",
    type: "yes-no",
  },
  {
    id: "tired_after_sleep",
    text: "Você acorda cansado(a), mesmo após uma noite completa de sono?",
    type: "yes-no",
  },
  {
    id: "daytime_sleepiness",
    text: "Você sente sonolência durante o dia?",
    type: "yes-no",
  },
  {
    id: "unintentional_napping",
    text: "Você já cochilou sem querer durante atividades como assistir TV, trabalhar ou dirigir?",
    type: "yes-no",
  },
  {
    id: "fatigue_lack_energy",
    text: "Você sente fadiga ou falta de energia frequente ao longo do dia?",
    type: "yes-no",
  },
  {
    id: "concentration_memory",
    text: "Você tem dificuldade para se concentrar ou lapsos de memória?",
    type: "yes-no",
  },
  {
    id: "sleep_difficulty",
    text: "Você tem dificuldade para pegar no sono ou voltar a dormir ao acordar à noite?",
    type: "yes-no",
  },
  {
    id: "restless_sleep",
    text: "Seu sono é agitado, com muitos movimentos ou despertares?",
    type: "yes-no",
  },
  {
    id: "morning_headaches",
    text: "Você costuma acordar com dor de cabeça?",
    type: "yes-no",
  },
  {
    id: "mood_changes",
    text: "Você sente o humor deprimido, irritabilidade ou ansiedade, especialmente pela manhã?",
    type: "yes-no",
  },
  {
    id: "nocturia",
    text: "Você urina duas ou mais vezes por noite?",
    type: "yes-no",
  },
  {
    id: "health_conditions",
    text: "Você já foi diagnosticado(a) com hipertensão, diabetes, arritmia ou síndrome metabólica?",
    type: "yes-no",
  },
];

export default function ApneiaQuestionario() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer,
    };
    setAnswers(newAnswers);

    console.log("Resposta atual:", answer);
    console.log("Pergunta atual:", questions[currentQuestion].id);
    console.log("Todas as respostas:", newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalizar teste com um pequeno delay para melhor UX
      setIsLoading(true);
      setTimeout(() => {
        console.log("Teste finalizado com respostas:", newAnswers);
        setIsLoading(false);
        setShowResult(true);
      }, 1000);
    }
  };

  const calculateResult = () => {
    const yesAnswers = Object.values(answers).filter(
      (answer) => answer === "yes"
    ).length;

    console.log("Calculando resultado...");
    console.log('Total de respostas "sim":', yesAnswers);
    console.log("Respostas completas:", answers);

    return yesAnswers >= 4;
  };

  const redirectToWhatsApp = () => {
    const hasApneiaSymptoms = calculateResult();
    const yesCount = Object.values(answers).filter(
      (answer) => answer === "yes"
    ).length;

    const message = hasApneiaSymptoms
      ? `Olá! Fiz o teste de apneia no site da Clínica Sonnos e obtive ${yesCount} sintomas positivos. Gostaria de agendar uma consulta para avaliação profissional.`
      : `Olá! Fiz o teste de apneia no site da Clínica Sonnos e gostaria de saber mais sobre prevenção e cuidados com o sono.`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5585988239290&text=${encodeURIComponent(
      message
    )}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, "_blank");
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResult(false);
    setIsLoading(false);
  };

  // Loading entre perguntas ou no final
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen w-full flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-br from-blue-600 via-white to-yellow-400">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-amber-400 rounded-full animate-spin-reverse"></div>
            </div>
            <div className="text-center">
              <h2 className="text-black text-xl font-semibold mb-1">
                Analisando Respostas
              </h2>
              <p className="text-black text-sm">
                Preparando seu resultado personalizado...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Tela de resultado
  if (showResult) {
    const hasApneiaSymptoms = calculateResult();
    const yesCount = Object.values(answers).filter(
      (answer) => answer === "yes"
    ).length;

    console.log("Exibindo resultado...");
    console.log("Tem sintomas de apneia:", hasApneiaSymptoms);
    console.log('Contagem de "sim":', yesCount);

    return (
      <>
        <Header />
  <div className="min-h-screen w-full flex items-center justify-center p-3 overflow-hidden pt-16 bg-gradient-to-br from-blue-600 via-white to-yellow-400">
          {/* Content */}
          <div className="max-w-xl w-full">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mb-3">
                <Image
                  src="/sonnos1.png"
                  alt="Clínica Sonnos"
                  width={160}
                  height={64}
                  className="mx-auto h-12 w-auto object-contain filter brightness-110"
                  priority
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-amber-200 bg-clip-text text-transparent mb-2">
                Resultado do Teste
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
            </div>

            {/* Card de resultado */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6 shadow-2xl">
              {/* Estatísticas do teste */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-4 bg-black/20  
                 rounded-xl p-3 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {yesCount}
                    </div>
                    <div className="text-xs text-white/70">Sintomas</div>
                  </div>
                  <div className="text-white/50">de</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {questions.length}
                    </div>
                    <div className="text-xs text-white/70">Perguntas</div>
                  </div>
                </div>
              </div>

              {/* Ícone de resultado */}
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    hasApneiaSymptoms
                      ? "bg-gradient-to-r from-amber-500/80 to-orange-600/80"
                      : "bg-gradient-to-r from-emerald-500/80 to-green-600/80"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {hasApneiaSymptoms ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* Resultado */}
              <div className="text-center mb-6">
                {hasApneiaSymptoms ? (
                  <div>
                    <h3 className="text-xl font-bold text-amber-300 mb-3">
                      ⚠️ Atenção
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed mb-4">
                      Responder &quot;Sim&quot; a{" "}
                      <span className="font-semibold text-amber-300">
                        4 ou mais perguntas
                      </span>{" "}
                      pode indicar um possível distúrbio do sono, como a Apneia
                      Obstrutiva do Sono (AOS).
                    </p>
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-4">
                      <h4 className="text-amber-200 font-semibold mb-2">
                        Diferenças importantes:
                      </h4>
                      <div className="text-left space-y-2 text-sm">
                        <p className="text-amber-200">
                          <span className="font-semibold">👩 Mulheres:</span> A
                          AOS pode se manifestar de forma atípica, com fadiga,
                          insônia, cefaleia e alterações de humor, mesmo sem
                          ronco evidente ou sonolência excessiva.
                        </p>
                        <p className="text-amber-200">
                          <span className="font-semibold">👨 Homens:</span> O
                          ronco alto e pausas respiratórias são mais frequentes,
                          mas os sintomas diurnos podem ser semelhantes.
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                      <p className="text-red-200 text-sm">
                        É{" "}
                        <span className="font-semibold">
                          altamente recomendado
                        </span>{" "}
                        buscar uma avaliação profissional na{" "}
                        <span className="font-semibold">Clínica Sonnos</span>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-emerald-300 mb-3">
                      ✅ Resultado Tranquilizador
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed mb-4">
                      Você apresentou{" "}
                      <span className="font-semibold text-emerald-300">
                        {yesCount} sintomas
                      </span>
                      , o que não indica sinais significativos de apneia do sono
                      no momento.
                    </p>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4">
                      <p className="text-emerald-200 text-sm">
                        Continue cuidando da sua saúde do sono! A{" "}
                        <span className="font-semibold">Clínica Sonnos</span>
                        <br />
                        oferece consultas preventivas para manter sua qualidade
                        de vida.
                        <br />
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões de ação */}
              <div className="space-y-3">
                <button
                  onClick={redirectToWhatsApp}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                  </svg>
                  <span>
                    {hasApneiaSymptoms
                      ? "Agendar Consulta"
                      : "Falar com Especialista"}
                  </span>
                </button>

                <button
                  onClick={resetQuiz}
                  className="w-full bg-black/20 border border-yellow-500/30 hover:bg-black/60 text-white font-medium py-3 px-5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Refazer Teste
                </button>
              </div>

              {/* Disclaimer compacto */}
              <div className="mt-4 p-3 bg-black/20 rounded-xl border border-yellow-500/20">
                <p className="text-xs text-white/70 flex items-start">
                  <svg
                    className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Este teste é apenas indicativo. Para diagnóstico preciso,
                    que entre em contato conosco.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
  <div className="min-h-screen w-full flex items-center justify-center p-3 overflow-hidden pt-16 bg-gradient-to-br from-blue-600 via-white to-yellow-400">
        {/* Content */}
        <div className="max-w-xl w-full">
          {/* Header compacto */}
          <div className="text-center mb-6">
            <div className="mb-4">
              <Image
                src="/sonnos1.png"
                alt="Clínica Sonnos"
                width={200}
                height={80}
                className="mx-auto h-14 w-auto object-contain filter brightness-110"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-black mb-3">
              Seu sono está afetando sua saúde?
            </h1>
            <p className="text-base text-black mb-4">
              Responda ao questionário abaixo e descubra.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full"></div>
          </div>

          {/* Progress bar compacto */}
          <div className="mb-6">
            <div className="relative">
              <div className="h-1.5 bg-black/20 rounded-full overflow-hidden border border-yellow-500/20">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-medium text-black">
                  Pergunta {currentQuestion + 1}
                </span>
                <span className="text-xs font-medium text-black">
                  {questions.length} perguntas
                </span>
              </div>
            </div>
          </div>

          {/* Card da pergunta compacto */}
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-yellow-500/30 p-6 shadow-2xl">
            <div key={currentQuestion}>
              <h2 className="text-2xl font-semibold text-white mb-6 text-center leading-relaxed">
                {questions[currentQuestion].text}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleAnswer("yes")}
                    className="w-full group bg-black/10 border border-gray-700 text-white font-bold py-4 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow hover:scale-[1.03] active:scale-[0.98] hover:border-yellow-400 hover:shadow-lg min-h-[56px] mb-0"
                  >
                    <div className="w-6 h-6 bg-black/80 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-700 group-hover:border-yellow-400">
                      <svg
                        className="w-5 h-5 text-yellow-400 group-hover:text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-base">Sim</span>
                  </button>
                  <button
                    onClick={() => handleAnswer("no")}
                    className="w-full group bg-black/20 border border-gray-700 text-white font-bold py-4 px-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow hover:scale-[1.03] active:scale-[0.98] hover:border-yellow-400 hover:shadow-lg min-h-[56px]"
                  >
                    <div className="w-6 h-6 bg-black/80 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-700 group-hover:border-yellow-400">
                      <svg
                        className="w-5 h-5 text-yellow-400 group-hover:text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <span className="text-base">Não</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
        `}</style>
      </div>
    </>
  );
}
