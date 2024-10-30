# 📌개요

이 프로젝트는 [[노마드코더] 바닐라 JS로 그림 앱 만들기](https://nomadcoders.co/javascript-for-beginners-2/lobby)강의를 기반으로 진행한 프로젝트다.
강의를 따라하기만 해도 완성할 수 있는 프로젝트지만 그렇게 진행하면 공부가 되지 않을 것 같아 강의를 끊지 않고 끝까지 본 후 직접 [기술 문서(Canvas API)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)를 참고하여 진행했다.

**프로젝트의 목적** - `JS`, `HTML`, `CSS`를 직접 사용해보며 익히기 위함.
**프로젝트 기간** - 2024.10.29 ~ 2024.10.30
**결과물** - [웹 그림판](https://sung6770.github.io/sketchboard/)

---

# 📌웹 그림판

구현한 웹 그림판은 다음과 같은 기능들을 가진다.

- 선 그리기
  - 굵기 조절
  - 색상 선택
- 색상 채우기
  - 색상 선택
- 지우개
  - 굵기 조절
- 텍스트 스탬프
  - 크기 조절
  - 색상 선택
- 이미지 파일 입력
- 초기화
- 저장

## ✨선 그리기

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/87b55ddf-0445-4c66-aa98-a5ac6d9fd872/image.gif", width='400'>
</p>
캔버스에 선을 그릴 수 있다.

주어진 팔레트 또는 직접 색상을 선택해 선의 색을 바꿀 수 있고 슬라이더를 통해 선의 굵기를 정할 수 있다.

## ✨색상 채우기

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/dd4146fc-2f3c-4fcb-8165-9c8d0e28738d/image.gif", width='400'>
</p>
캔버스를 선택한 색상으로 채울 수 있다.

## ✨지우개

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/047da106-c647-4713-9297-83fedd21aa69/image.gif", width='400'>
</p>
캔버스에 그려진 요소를 지울 수 있다.

## ✨텍스트 스탬프

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/77863792-974b-43f4-86f4-2d91c898ed37/image.gif", width='400'>
</p>
텍스트를 입력해 텍스트 스탬프를 만들 수 있는 기능이다. 슬라이드 바로 텍스트의 크기를 조절할 수 있고 색상또한 변경할 수 있다.

## ✨이미지 파일 입력

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/f5107003-ce99-4502-93a7-0da58494cd60/image.gif
", width='400'>
</p>
선택한 이미지를 캔버스에 그릴 수 있다.

## ✨초기화

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/007dc34d-b45f-4690-8f47-28ebbb5be95f/image.gif", width='400'>
</p>
캔버스를 초기화할 수 있다.

## ✨저장

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/6c597b19-dbad-49c3-80d5-dab6713b7210/image.gif", width='400'>
</p>
캔버스에 그린 그림을 저장할 수 있다.

---

# 📌문제 발생 및 해결

캔버스 저장 기능을 완성하고 테스트하던 중 배경을 칠하지 않고 그리게 되면 아래 사진과 같이 투명한 배경에 그려진다는 것을 알게 되었다.

<p align="center">
  <img src="https://velog.velcdn.com/images/sung6770/post/5fca4550-4aa3-4154-819d-8e7faa07b3d0/image.png", width='400'>
</p>

캔버스를 생성한 후 먼저 흰색으로 배경을 칠함으로써 문제를 해결했다.
= `context.fillStyle`을 `white`로 설정 후 화면을 칠했다.

하지만 이러한 수정으로 인해 문제가 연이어 발생했다.
초기에 `context.fillStyle`을 `white`로 설정했기 때문에 색상을 고르지 않고 화면을 채우려고 하면 검은색이 아닌 흰색으로 채워지게 됐다.
또한 초기화 함수에서도 `context.fillStyle`을 `white`로 설정하기 때문에 초기화 이후에도 같은 문제가 발생했다.

| ![](https://velog.velcdn.com/images/sung6770/post/dafef281-a596-469e-b954-0b68caa187da/image.gif) | ![](https://velog.velcdn.com/images/sung6770/post/bfe9df4f-6374-4b20-a200-99304802975a/image.gif) |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |

방법을 생각하다 초기 값이 `black`인 `currColor`라는 전역 변수를 생성 후 색상을 변경할 때 마다 해당 변수의 값을 변경해 색상 정보를 저장했다.
초기화 후에도 `ctx.fillStyle`을 `currColor`값으로 설정해 주어 문제를 해결했다.

생각하지도 못한 곳에서 문제가 발생하고 이로 인해 추가적인 문제가 연쇄적으로 발생하니 초반 설계가 얼마나 중요한지 다시 한번 생각해보는 계기가 된 것 같다.

---

# 📌결과물

- [Github](https://github.com/sung6770/sketchboard)
- [웹 그림판](https://sung6770.github.io/sketchboard/)
