/**
 * @format
 */

import { NativeModules } from 'react-native';
import React from 'react';
import App from '../App.js';

const { DistributedBbsModule } = NativeModules;

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('signs correctly', async () => {
  const msg = "hoge";
  const cred = "kZOS3AAgzPRvzPbMnMzFZDDMu1tlzJJSzMMuzPPM+lw8zJTMqVJ5c8zIXCwGIMyHYszIDNwAMMyQPsymzMvMjVLM4MyxzOkdzNwMzKdvzLfMgszYzM3M2kQDzJLMwszZzKDM1My8CgzMmMzBzPoPzMTMvERlDVogzLjMkTMbzK7M2MzFTZLcACBAzPkSzL3MvsyvUH9NzOvMzVEVQMy4zPjMxMzrzMgDzKTMrszoHMyxE8yMQMyAzP9eONwAMMy5c1nMucyTdh3M18zILwTMxVjMg1NfdTjMx3LMncyBJGJvzIswJU7M137MuQx0McyZzPIJakEnM8yYzK4NYMzOa5LcACDMrsyOQyYYzJTMyBvMxMzkDszAzKUVLmECUwXM9MzLzMFoInvMncykDczwzOLM5RvcADDMkcz6zPzMpMzMzPnMpkHMmAQbR8z7GMzHzM7MpMzRzLdzK8zTzMzM0MyjzOYfUXTMkcyIzMzMpxwNzL4hzNZxzM8szPUGSszMzMXM1mI=";
  const gpk = "ldwAMMy1UczUKDjM8BbMjmXM28yXMhgdTUTMpCF8dczSSMzLe0AsMsyDPDgLzKLM0gXMn2PMvknMpsyZVjATG1TMpRrMutwAMMyrzN8VY1I5zPB3QD/MuQpkzNVOzIbM8FjMuMyybMydzPDM1szIzLrMucyTPB03W8zTzJUnzOXM4wbM48yTH8z8zJMfSszZzKY13AAwzJbM1BYqaGtkb8zmXTHM4MzqzKFUEMzgJHDMyczNdiALcczjzIENEARGF0FpzOpRSgDM4kfM7TLMwsytzLJKzLbM8NwAMMyTJDQvH8yAzMwbUTAJEmFTeXBPzInMusyfzKjMzwoRBMzuO1bM62fMzXAnzI8mzOIYzLLM8z7M5szOzI4xasz4f8ylk5LcADDMuczMzL01P3/MtErMuHPMtcznY8zhYcywzLY9zII4YTJ+DwXMwyjMvcyqMhdiZAXMqRzMoszHZ8zYzLvMs8zyzMPMnwnM3syJ3ABgzIZVDjkdzJLMk8yJzLcHzLfMjHsSL0wuzI8XzLg+zMPMn8yAXMzmIhAEYXrMlztWExEhDMyzWCHM0cyXSyvMwnDMhgbMjVV7AcyizIzM0TtJEszszJomCszSLhvMvczpTgpozLNkX1rMjsyMIGh3RWTMuwUsWCTMkiwyzJrMkszfOWgkktwAMMywzMJ2zP/MozrMiMyqOszVB8yMzMUpzJVtzIbM6FfMoBd1zPw8WszLD1bMhTh/cMyPe1wxQTDM6R7Mh0hhMHxNzKjMo9wAYMyqchU6zKcYHczJzLN0zOrMmcy/zIPMuAvMszkQBhTM+czozPdlzPdPzPVdzJfMn8zBzIjMyQhya8zszL3MwjoBzJ5ZzKokT8yMAMy8zIQmLAnMusynzOJqzORmzJLMj2BUXiXMwsy7LVPM8sytzLzM5AEAGsymzLzMlmTMxGjM/8yBzIvMhMyGzMo2zLDMt8zBzIfMnczYktwAMMySzJ7M1QhgUsyHbMz1WszwzPUnzIxmVszXbFjMvFV9VwTMnCQuWSLMtczvzOYazLolzJHMqszdzO7M4y0TJRkPR3dQ3ABgzK3MjljMp8zCcBnM38yVP8zhGcydzKXMnsyjFxNrzJPM08ypzLzMoWXMvUbMwMyefMyYO2ljzJQWKwbM08zczOAQFcyDW8yvTnIXzK/M4cyCDcyFzLdNzP9tL13M8nTM3lQRzJp6zJLMiFrM5jsYez0ZKF0VzJtAzILM+24kzPTMwcz5zKMzzK7MzX7MrSQK";
  const seed = "aG9nZWhvZ2Vob2dlaG9nZWhvZ2Vob2dlaG9nZWhvZ2U=";
  
  const correct = 'nNwAMMylOyvMhMztzPsbQsyXzIXMki7Mi8zNPQrMuszqB0PM7Sp6zJrMqUrMqnjMnhLM/RvM08yhzIBEzLd1QFMxzMvM2Mz4D1zM9gbcADDMocz6SczPzKPMn8zxzLrMwE41zNzM4WhqBX/MmMzmzJTMhDgnzMoSzL7MiBfMlsylMszfzJBCYXvM18yyzM16zKIkRF1XzKt/zPfcADDMocyMzKTMzszTzL1izO14GMzpGsyhMsy4zPDMgczqzOXM8MzbHcyazKHMtBMBzJPMm0vMoszGbczAAMyQesz9YTAEN0xEzMQ2zOt8k9wAMMyxzPPMz38iex/MtXpKzLTMzAJSzJbMl3XMmMyEzMTMtgnMsW3My8yTzL9LJ8yZzPvM3nh2M8zZzIY7HsybPMyIYczpzJF1zLY/3AAwzIZTzKHM1icvzOtIzMzM0MzUzOzM1szTfwI/zOAzzIDM6lPM5mINzO5BzM3M08zjOw/M2D7MqszlzLrMjcy6zKrMs1t9KMzFLMz8zOzcADDMqm1mYMyffszaNDLM1wkhLczWRMyRcszIzPthzNnM18z/NMz4OUsozKxrLFvMqxhxzNVOHsyGzLzM839vSMzoEcyoHdwAIMyqGlQlJMzYzIjM1UssHA/M82J3zO/M/ns0dMynZh4wzLLMhHvM7TQ1UW7cACDMoszizKZLzLDMtsy/zLUieQfM0szaRBhEcwbM4My4zPnM0czNR8zdzPHMnFvM5GQBAdwAIMzKzIfM6szIzObM31N+CF4wRwvMrHXMgGQDzIZLLSdTzIwwFcyqzLTMhczFzJ003AAgeczizNw4InY0LmZJzObMmszzzN3M0k7MvW1QGczRzN/Mt1U2zLdGERFUJw2T3AAgzLQJAx/Mr3DMnWbMgcyBzNvM7BIdWRHMv8zazInMzcztzMtJzNYEFcyqHnrM0mI73AAgzI7M3szyzNXM4cyMLcyYCszvX8zAzLAxzPB/zMjM4VfMsMzHYWstzKpBzPbMlX7MlcyhRdwAIMzgHk/M28zezKvM2UMONMzGeczARUAtRsyuFczJc8yheB1uzPkXcMyvSsyxBJPcACBkzP3Mt8y9MMyxzM3M08zCzJ/M1mnMl8ydzPUhzKLMviECzM3Mk8zmDMyBUFnM8syBzIfM1AXcACDMrszqzOUzzK7M38ygzNx1VGUyzKJPHMy4fm7M+syIzNN0zLnMrMyxzJcZTcytzMbMoV7cACDM137MzA19cFBTzI0jzJhgzNd9aMyxzJA1zL8ezJ5jZsybzLHMvj9czIbM2D5Hk9wAIDfMisyHMlfM1gHMmRDM4My3zNwoNMzmcczBzLkWUGwRzPvM58zizIHMtszODHwsZdwAIFjM8MzLzPdfzOvMkSLMvszXacz3zKkuDknMmgLMw8yCZszUzPt5zJN5CBTMoxzMhx/cACBiLMz6zP7MtxjM5H0fSU/Mp8zuBszDzI8VcMymzITMqEIyIEDMiXfMv8zJzIETcJPcACDMkMyPzIAVccyAzOccRWlBMsz4GMyCAiB6WgvMnCQczPLM6MzBPzXM+MzFzM1R3AAgzPTMzArM+sz6Ccz2SxXM1HU4FRVyzJFRzIEnMsyhJC/M3B3Mlsy4HXrMhMzjCdwAIAcazJ3M/T/Mscy1TMyRPczrNMyETcypIMyvHsyszPHMl8ywzI7Mm8zSzN43PzgWzOEV';
  const signature = await DistributedBbsModule.sign(msg, cred, gpk, seed);

  expect(signature).toBe(correct);
})

it('verifies correctly', async () => {
  const msg = "hoge";
  const gpk = "ldwAMMy1UczUKDjM8BbMjmXM28yXMhgdTUTMpCF8dczSSMzLe0AsMsyDPDgLzKLM0gXMn2PMvknMpsyZVjATG1TMpRrMutwAMMyrzN8VY1I5zPB3QD/MuQpkzNVOzIbM8FjMuMyybMydzPDM1szIzLrMucyTPB03W8zTzJUnzOXM4wbM48yTH8z8zJMfSszZzKY13AAwzJbM1BYqaGtkb8zmXTHM4MzqzKFUEMzgJHDMyczNdiALcczjzIENEARGF0FpzOpRSgDM4kfM7TLMwsytzLJKzLbM8NwAMMyTJDQvH8yAzMwbUTAJEmFTeXBPzInMusyfzKjMzwoRBMzuO1bM62fMzXAnzI8mzOIYzLLM8z7M5szOzI4xasz4f8ylk5LcADDMuczMzL01P3/MtErMuHPMtcznY8zhYcywzLY9zII4YTJ+DwXMwyjMvcyqMhdiZAXMqRzMoszHZ8zYzLvMs8zyzMPMnwnM3syJ3ABgzIZVDjkdzJLMk8yJzLcHzLfMjHsSL0wuzI8XzLg+zMPMn8yAXMzmIhAEYXrMlztWExEhDMyzWCHM0cyXSyvMwnDMhgbMjVV7AcyizIzM0TtJEszszJomCszSLhvMvczpTgpozLNkX1rMjsyMIGh3RWTMuwUsWCTMkiwyzJrMkszfOWgkktwAMMywzMJ2zP/MozrMiMyqOszVB8yMzMUpzJVtzIbM6FfMoBd1zPw8WszLD1bMhTh/cMyPe1wxQTDM6R7Mh0hhMHxNzKjMo9wAYMyqchU6zKcYHczJzLN0zOrMmcy/zIPMuAvMszkQBhTM+czozPdlzPdPzPVdzJfMn8zBzIjMyQhya8zszL3MwjoBzJ5ZzKokT8yMAMy8zIQmLAnMusynzOJqzORmzJLMj2BUXiXMwsy7LVPM8sytzLzM5AEAGsymzLzMlmTMxGjM/8yBzIvMhMyGzMo2zLDMt8zBzIfMnczYktwAMMySzJ7M1QhgUsyHbMz1WszwzPUnzIxmVszXbFjMvFV9VwTMnCQuWSLMtczvzOYazLolzJHMqszdzO7M4y0TJRkPR3dQ3ABgzK3MjljMp8zCcBnM38yVP8zhGcydzKXMnsyjFxNrzJPM08ypzLzMoWXMvUbMwMyefMyYO2ljzJQWKwbM08zczOAQFcyDW8yvTnIXzK/M4cyCDcyFzLdNzP9tL13M8nTM3lQRzJp6zJLMiFrM5jsYez0ZKF0VzJtAzILM+24kzPTMwcz5zKMzzK7MzX7MrSQK";
  const signature = 'nNwAMMylOyvMhMztzPsbQsyXzIXMki7Mi8zNPQrMuszqB0PM7Sp6zJrMqUrMqnjMnhLM/RvM08yhzIBEzLd1QFMxzMvM2Mz4D1zM9gbcADDMocz6SczPzKPMn8zxzLrMwE41zNzM4WhqBX/MmMzmzJTMhDgnzMoSzL7MiBfMlsylMszfzJBCYXvM18yyzM16zKIkRF1XzKt/zPfcADDMocyMzKTMzszTzL1izO14GMzpGsyhMsy4zPDMgczqzOXM8MzbHcyazKHMtBMBzJPMm0vMoszGbczAAMyQesz9YTAEN0xEzMQ2zOt8k9wAMMyxzPPMz38iex/MtXpKzLTMzAJSzJbMl3XMmMyEzMTMtgnMsW3My8yTzL9LJ8yZzPvM3nh2M8zZzIY7HsybPMyIYczpzJF1zLY/3AAwzIZTzKHM1icvzOtIzMzM0MzUzOzM1szTfwI/zOAzzIDM6lPM5mINzO5BzM3M08zjOw/M2D7MqszlzLrMjcy6zKrMs1t9KMzFLMz8zOzcADDMqm1mYMyffszaNDLM1wkhLczWRMyRcszIzPthzNnM18z/NMz4OUsozKxrLFvMqxhxzNVOHsyGzLzM839vSMzoEcyoHdwAIMyqGlQlJMzYzIjM1UssHA/M82J3zO/M/ns0dMynZh4wzLLMhHvM7TQ1UW7cACDMoszizKZLzLDMtsy/zLUieQfM0szaRBhEcwbM4My4zPnM0czNR8zdzPHMnFvM5GQBAdwAIMzKzIfM6szIzObM31N+CF4wRwvMrHXMgGQDzIZLLSdTzIwwFcyqzLTMhczFzJ003AAgeczizNw4InY0LmZJzObMmszzzN3M0k7MvW1QGczRzN/Mt1U2zLdGERFUJw2T3AAgzLQJAx/Mr3DMnWbMgcyBzNvM7BIdWRHMv8zazInMzcztzMtJzNYEFcyqHnrM0mI73AAgzI7M3szyzNXM4cyMLcyYCszvX8zAzLAxzPB/zMjM4VfMsMzHYWstzKpBzPbMlX7MlcyhRdwAIMzgHk/M28zezKvM2UMONMzGeczARUAtRsyuFczJc8yheB1uzPkXcMyvSsyxBJPcACBkzP3Mt8y9MMyxzM3M08zCzJ/M1mnMl8ydzPUhzKLMviECzM3Mk8zmDMyBUFnM8syBzIfM1AXcACDMrszqzOUzzK7M38ygzNx1VGUyzKJPHMy4fm7M+syIzNN0zLnMrMyxzJcZTcytzMbMoV7cACDM137MzA19cFBTzI0jzJhgzNd9aMyxzJA1zL8ezJ5jZsybzLHMvj9czIbM2D5Hk9wAIDfMisyHMlfM1gHMmRDM4My3zNwoNMzmcczBzLkWUGwRzPvM58zizIHMtszODHwsZdwAIFjM8MzLzPdfzOvMkSLMvszXacz3zKkuDknMmgLMw8yCZszUzPt5zJN5CBTMoxzMhx/cACBiLMz6zP7MtxjM5H0fSU/Mp8zuBszDzI8VcMymzITMqEIyIEDMiXfMv8zJzIETcJPcACDMkMyPzIAVccyAzOccRWlBMsz4GMyCAiB6WgvMnCQczPLM6MzBPzXM+MzFzM1R3AAgzPTMzArM+sz6Ccz2SxXM1HU4FRVyzJFRzIEnMsyhJC/M3B3Mlsy4HXrMhMzjCdwAIAcazJ3M/T/Mscy1TMyRPczrNMyETcypIMyvHsyszPHMl8ywzI7Mm8zSzN43PzgWzOEV';
  
  const result = await DistributedBbsModule.verify(msg, signature, gpk);

  expect(signature).toBe(true);
})

it('denies wrong signature', async () => {
  const msg = "hoge";
  const gpk = "ldwAMMy1UczUKDjM8BbMjmXM28yXMhgdTUTMpCF8dczSSMzLe0AsMsyDPDgLzKLM0gXMn2PMvknMpsyZVjATG1TMpRrMutwAMMyrzN8VY1I5zPB3QD/MuQpkzNVOzIbM8FjMuMyybMydzPDM1szIzLrMucyTPB03W8zTzJUnzOXM4wbM48yTH8z8zJMfSszZzKY13AAwzJbM1BYqaGtkb8zmXTHM4MzqzKFUEMzgJHDMyczNdiALcczjzIENEARGF0FpzOpRSgDM4kfM7TLMwsytzLJKzLbM8NwAMMyTJDQvH8yAzMwbUTAJEmFTeXBPzInMusyfzKjMzwoRBMzuO1bM62fMzXAnzI8mzOIYzLLM8z7M5szOzI4xasz4f8ylk5LcADDMuczMzL01P3/MtErMuHPMtcznY8zhYcywzLY9zII4YTJ+DwXMwyjMvcyqMhdiZAXMqRzMoszHZ8zYzLvMs8zyzMPMnwnM3syJ3ABgzIZVDjkdzJLMk8yJzLcHzLfMjHsSL0wuzI8XzLg+zMPMn8yAXMzmIhAEYXrMlztWExEhDMyzWCHM0cyXSyvMwnDMhgbMjVV7AcyizIzM0TtJEszszJomCszSLhvMvczpTgpozLNkX1rMjsyMIGh3RWTMuwUsWCTMkiwyzJrMkszfOWgkktwAMMywzMJ2zP/MozrMiMyqOszVB8yMzMUpzJVtzIbM6FfMoBd1zPw8WszLD1bMhTh/cMyPe1wxQTDM6R7Mh0hhMHxNzKjMo9wAYMyqchU6zKcYHczJzLN0zOrMmcy/zIPMuAvMszkQBhTM+czozPdlzPdPzPVdzJfMn8zBzIjMyQhya8zszL3MwjoBzJ5ZzKokT8yMAMy8zIQmLAnMusynzOJqzORmzJLMj2BUXiXMwsy7LVPM8sytzLzM5AEAGsymzLzMlmTMxGjM/8yBzIvMhMyGzMo2zLDMt8zBzIfMnczYktwAMMySzJ7M1QhgUsyHbMz1WszwzPUnzIxmVszXbFjMvFV9VwTMnCQuWSLMtczvzOYazLolzJHMqszdzO7M4y0TJRkPR3dQ3ABgzK3MjljMp8zCcBnM38yVP8zhGcydzKXMnsyjFxNrzJPM08ypzLzMoWXMvUbMwMyefMyYO2ljzJQWKwbM08zczOAQFcyDW8yvTnIXzK/M4cyCDcyFzLdNzP9tL13M8nTM3lQRzJp6zJLMiFrM5jsYez0ZKF0VzJtAzILM+24kzPTMwcz5zKMzzK7MzX7MrSQK";
  const signature = 'nNwAMMylOyvMhMztzPsbQsyXzIXMki7Mi8zNPQrMuszqB0PM7Sp6zJrMqUrMqnjMnhLM/RvM08yhzIBEzLd1QFMxzMvM2Mz4D1zM9gbcADDMocz6SczPzKPMn8zxzLrMwE41zNzM4WhqBX/MmMzmzJTMhDgnzMoSzL7MiBfMlsylMszfzJBCYXvM18yyzM16zKIkRF1XzKt/zPfcADDMocyMzKTMzszTzL1izO14GMzpGsyhMsy4zPDMgczqzOXM8MzbHcyazKHMtBMBzJPMm0vMoszGbczAAMyQesz9YTAEN0xEzMQ2zOt8k9wAMMyxzPPMz38iex/MtXpKzLTMzAJSzJbMl3XMmMyEzMTMtgnMsW3My8yTzL9LJ8yZzPvM3nh2M8zZzIY7HsybPMyIYczpzJF1zLY/3AAwzIZTzKHM1icvzOtIzMzM0MzUzOzM1szTfwI/zOAzzIDM6lPM5mINzO5BzM3M08zjOw/M2D7MqszlzLrMjcy6zKrMs1t9KMzFLMz8zOzcADDMqm1mYMyffszaNDLM1wkhLczWRMyRcszIzPthzNnM18z/NMz4OUsozKxrLFvMqxhxzNVOHsyGzLzM839vSMzoEcyoHdwAIMyqGlQlJMzYzIjM1UssHA/M82J3zO/M/ns0dMynZh4wzLLMhHvM7TQ1UW7cACDMoszizKZLzLDMtsy/zLUieQfM0szaRBhEcwbM4My4zPnM0czNR8zdzPHMnFvM5GQBAdwAIMzKzIfM6szIzObM31N+CF4wRwvMrHXMgGQDzIZLLSdTzIwwFcyqzLTMhczFzJ003AAgeczizNw4InY0LmZJzObMmszzzN3M0k7MvW1QGczRzN/Mt1U2zLdGERFUJw2T3AAgzLQJAx/Mr3DMnWbMgcyBzNvM7BIdWRHMv8zazInMzcztzMtJzNYEFcyqHnrM0mI73AAgzI7M3szyzNXM4cyMLcyYCszvX8zAzLAxzPB/zMjM4VfMsMzHYWstzKpBzPbMlX7MlcyhRdwAIMzgHk/M28zezKvM2UMONMzGeczARUAtRsyuFczJc8yheB1uzPkXcMyvSsyxBJPcACBkzP3Mt8y9MMyxzM3M08zCzJ/M1mnMl8ydzPUhzKLMviECzM3Mk8zmDMyBUFnM8syBzIfM1AXcACDMrszqzOUzzK7M38ygzNx1VGUyzKJPHMy4fm7M+syIzNN0zLnMrMyxzJcZTcytzMbMoV7cACDM137MzA19cFBTzI0jzJhgzNd9aMyxzJA1zL8ezJ5jZsybzLHMvj9czIbM2D5Hk9wAIDfMisyHMlfM1gHMmRDM4My3zNwoNMzmcczBzLkWUGwRzPvM58zizIHMtszODHwsZdwAIFjM8MzLzPdfzOvMkSLMvszXacz3zKkuDknMmgLMw8yCZszUzPt5zJN5CBTMoxzMhx/cACBiLMz6zP7MtxjM5H0fSU/Mp8zuBszDzI8VcMymzITMqEIyIEDMiXfMv8zJzIETcJPcACDMkMyPzIAVccyAzOccRWlBMsz4GMyCAiB6WgvMnCQczPLM6MzBPzXM+MzFzM1R3AAgzPTMzArM+sz6Ccz2SxXM1HU4FRVyzJFRzIEnMsyhJC/M3B3Mlsy4HXrMhMzjCdwAIAcazJ3M/T/Mscy1TMyRPczrNMyETcypIMyvHsyszPHMl8ywzI7Mm8zSzN43PzgWzOEV';

  const wrongSignature = 'hoge'
  const result = await DistributedBbsModule.verify(msg, wrongSignature, gpk);
  expect(result).toBe(false);

  // 'hogehoge' => 'hogehoga'
  const wrongSignature2 = signature.slice(0, signature.length - 1) + 'a';
  const result2 = await DistributedBbsModule.verify(msg, wrongSignature2, gpk);
  expect(result2).toBe(false);
})